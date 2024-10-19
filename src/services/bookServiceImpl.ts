import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Book } from "@/models/book";
import { BookDTO } from "@/interfaces/bookDTO";
import { BookService } from "@/services/bookService";

const dbPath = path.resolve(__dirname, "../../data/db.json");

export class BookServiceImpl implements BookService {
  // Read the data from the file
  private async readFromFile(): Promise<Book[]> {
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      return JSON.parse(data) as Book[];
    } catch (error) {
      console.error("Error reading from file", error);
      return [];
    }
  }

  // Write the data to the file
  private async writeToFile(books: Book[]): Promise<void> {
    try {
      await fs.writeFile(dbPath, JSON.stringify(books, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing to file", error);
    }
  }

  // Get all the books
  public async getBooks(): Promise<Book[]> {
    return await this.readFromFile();
  }

  // Get a book by id
  public async getBookById(id: string): Promise<Book | null> {
    const books = await this.readFromFile();
    const book = books.find((b) => b.id === id);
    return book || null;
  }

  // Add a book
  public async addBook(bookData: BookDTO): Promise<Book | string> {
    const books = await this.readFromFile();

    const existingBook = books.find((book) => book.title === bookData.title);
    if (existingBook) {
      return "Book with the same name already exists";
    }

    const newBook = new Book(
      uuidv4(),
      bookData.title,
      bookData.author,
      bookData.description,
      bookData.year,
      bookData.page,
      bookData.publisher
    );

    books.push(newBook);
    await this.writeToFile(books);

    return newBook;
  }

  // Update a book
  public async updateBook(id: string, bookData: BookDTO): Promise<Book | null> {
    const books = await this.readFromFile();
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) return null;

    const updatedBook = { ...books[bookIndex], ...bookData };
    books[bookIndex] = updatedBook;
    await this.writeToFile(books);

    return updatedBook;
  }

  // Delete a book
  public async deleteBook(id: string): Promise<void> {
    let books = await this.readFromFile();
    books = books.filter((b) => b.id !== id);
    await this.writeToFile(books);
  }
}
