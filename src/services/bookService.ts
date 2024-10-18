import { Book } from "@/models/book";
import { BookDTO } from "@/interfaces/bookDTO";

export interface BookService {
  getBooks(): Promise<Book[]>;
  getBookById(id: number): Promise<Book | null>;
  addBook(bookData: BookDTO): Promise<Book | string>;
  updateBook(id: number, bookData: BookDTO): Promise<Book | null>;
  deleteBook(id: number): Promise<void>;
}
