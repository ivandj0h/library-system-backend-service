import { Book } from "@/models/book";
import { BookDTO } from "@/interfaces/bookDTO";

export interface BookService {
  getBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
  addBook(bookData: BookDTO): Promise<Book | string>;
  updateBook(id: string, bookData: BookDTO): Promise<Book | null>;
  deleteBook(id: string): Promise<void>;
}
