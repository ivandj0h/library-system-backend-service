import fs from "fs/promises";
import path from "path";
import { Book } from "@/models/book";
import { BookDTO } from "@/interfaces/bookDTO";
import { BookService } from "@/services/bookService";

// const dbPath = path.resolve(__dirname, "@/data/db.json");
const dbPath = path.resolve(__dirname, "../../data/db.json");

export class BookServiceImpl implements BookService {
  private async readFromFile(): Promise<Book[]> {
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      return JSON.parse(data) as Book[];
    } catch (error) {
      return [];
    }
  }

  private async writeToFile(books: Book[]): Promise<void> {
    try {
      await fs.writeFile(dbPath, JSON.stringify(books, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing to file", error);
    }
  }

  public async getBooks(): Promise<Book[]> {
    return await this.readFromFile();
  }

  public async getBookById(id: number): Promise<Book | null> {
    const books = await this.readFromFile();
    const book = books.find((b) => b.id === id);
    return book || null;
  }

  public async addBook(bookData: BookDTO): Promise<Book | string> {
    const books = await this.readFromFile();
    const existingBook = books.find(book => book.name === bookData.name);
    if (existingBook) {
      return "Book with the same name already exists";
    }
    
    const newBook = new Book(
      books.length + 1, 
      bookData.name,
      bookData.author,
      bookData.publishedYear
    );

    books.push(newBook);
    await this.writeToFile(books);

    return newBook;
  }

  public async updateBook(id: number, bookData: BookDTO): Promise<Book | null> {
    const books = await this.readFromFile();
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) return null;

    const updatedBook = { ...books[bookIndex], ...bookData };
    books[bookIndex] = updatedBook;
    await this.writeToFile(books);
    return updatedBook;
  }

  public async deleteBook(id: number): Promise<void> {
    let books = await this.readFromFile();
    books = books.filter((b) => b.id !== id);
    await this.writeToFile(books);
  }
}
