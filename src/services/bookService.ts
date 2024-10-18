import { Book } from "../models/book";
import { BookDTO } from "./bookDTO";

export interface BookService {
  getBooks(): Book[];
  addBook(bookData: BookDTO): Book;
  updateBook(id: number, bookData: BookDTO): Book | null;
  deleteBook(id: number): void;
}
