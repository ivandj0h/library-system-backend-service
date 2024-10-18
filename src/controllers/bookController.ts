import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/book";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  public welcomeMessage(req: Request, res: Response): void {
    res.send("Welcome to the Library API!");
  }

  public getAllBooks(req: Request, res: Response): void {
    const books = this.bookService.getBooks();
    res.json(books);
  }

  public addBook(req: Request, res: Response): void {
    const { name, author, publishedYear } = req.body;
    const book = this.bookService.addBook({ name, author, publishedYear });
    res.status(201).json(book);
  }

  public updateBook(req: Request, res: Response): void {
    const { id } = req.params;
    const { name, author, publishedYear } = req.body;
    const updatedBook = this.bookService.updateBook(Number(id), {
      name,
      author,
      publishedYear,
    });
    res.json(updatedBook);
  }

  public deleteBook(req: Request, res: Response): void {
    const { id } = req.params;
    this.bookService.deleteBook(Number(id));
    res.status(204).send();
  }
}
