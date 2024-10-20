import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Book } from "@/models/book";
import { BookDTO } from "@/interfaces/bookDTO";
import { BookService } from "@/services/bookService";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const dbPath = path.resolve(__dirname, "../../data/db.json");

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
const useMongoDB = process.env.USE_MONGODB === "true";

let mongoClient: MongoClient | null = null;

// Coba connect ke MongoDB kalau USE_MONGODB=true
async function connectToMongoDB(): Promise<MongoClient | null> {
  if (useMongoDB) {
    try {
      const client = new MongoClient(mongoUri);
      await client.connect();
      console.log("Connected to MongoDB");
      return client;
    } catch (error) {
      console.error("Failed to connect to MongoDB, fallback to db.json", error);
      return null;
    }
  }
  return null;
}

export class BookServiceImpl implements BookService {
  constructor() {
    connectToMongoDB().then((client) => {
      mongoClient = client;
    });
  }

  // Read the data from the file (Fallback)
  private async readFromFile(): Promise<Book[]> {
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      return JSON.parse(data) as Book[];
    } catch (error) {
      console.error("Error reading from file", error);
      return [];
    }
  }

  // Write the data to the file (Fallback)
  private async writeToFile(books: Book[]): Promise<void> {
    try {
      await fs.writeFile(dbPath, JSON.stringify(books, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing to file", error);
    }
  }

  // MongoDB helpers
  private getMongoCollection() {
    if (!mongoClient) throw new Error("MongoDB is not connected");
    return mongoClient.db("library").collection("books");
  }

  // Get all the books
  public async getBooks(): Promise<Book[]> {
    if (mongoClient) {
      const books = await this.getMongoCollection().find().toArray();
      return books as unknown as Book[];
    } else {
      return await this.readFromFile();
    }
  }

  // Get a book by id
  public async getBookById(id: string): Promise<Book | null> {
    if (mongoClient) {
      const book = await this.getMongoCollection().findOne({ id });
      return (book as unknown as Book) || null;
    } else {
      const books = await this.readFromFile();
      const book = books.find((b) => b.id === id);
      return book || null;
    }
  }

  // Add a book
  public async addBook(bookData: BookDTO): Promise<Book | string> {
    if (mongoClient) {
      const newBook: Book = { id: uuidv4()!, ...bookData };
      await this.getMongoCollection().insertOne(newBook);
      return newBook;
    } else {
      const books = await this.readFromFile();
      const existingBook = books.find((book) => book.title === bookData.title);
      if (existingBook) {
        return "Book with the same name already exists";
      }
      const newBook: Book = {
        id: bookData.id ?? uuidv4(),
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        year: bookData.year,
        page: bookData.page,
        publisher: bookData.publisher,
      };
      books.push(newBook);
      await this.writeToFile(books);
      return newBook;
    }
  }

  // Update a book
  public async updateBook(id: string, bookData: BookDTO): Promise<Book | null> {
    const books = await this.readFromFile();
    const bookIndex = books.findIndex((b) => b.id === id);
    if (bookIndex === -1) return null;

    const updatedBook: Book = {
      id: books[bookIndex].id,
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      year: bookData.year,
      page: bookData.page,
      publisher: bookData.publisher,
    };

    books[bookIndex] = updatedBook;
    await this.writeToFile(books);

    return updatedBook;
  }

  // Delete a book
  public async deleteBook(id: string): Promise<void> {
    if (mongoClient) {
      await this.getMongoCollection().deleteOne({ id });
    } else {
      let books = await this.readFromFile();
      books = books.filter((b) => b.id !== id);
      await this.writeToFile(books);
    }
  }
}
