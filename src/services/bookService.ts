import { Book } from "@/models/book";
import { BookDTO } from "@/interfaces/bookDTO";

export interface BookService {
  getBooks(): Book[];
  getBookById(id: number): Book | null;
  addBook(bookData: BookDTO): Book;
  updateBook(id: number, bookData: BookDTO): Book | null;
  deleteBook(id: number): void;
}
