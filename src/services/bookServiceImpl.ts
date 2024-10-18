import { BookService } from "../interfaces/bookService";
import { Book } from "../models/book";
import { BookDTO } from "../interfaces/bookDTO";

export class BookServiceImpl implements BookService {
  private books: Book[] = [];

  public getBooks(): Book[] {
    return this.books;
  }

  public addBook(bookData: BookDTO): Book {
    const newBook = new Book(
      this.books.length + 1,
      bookData.name,
      bookData.author,
      bookData.publishedYear
    );
    this.books.push(newBook);
    return newBook;
  }

  public updateBook(id: number, bookData: BookDTO): Book | null {
    const bookIndex = this.books.findIndex((b) => b.id === id);
    if (bookIndex === -1) return null;

    const updatedBook = { ...this.books[bookIndex], ...bookData };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  public deleteBook(id: number): void {
    const bookIndex = this.books.findIndex((b) => b.id === id);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
    }
  }
}
