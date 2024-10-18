import { Request, Response } from "express";
import { BookService } from "@/services/bookService";
import { BookServiceImpl } from "@/services/bookServiceImpl";
import { sendResponse } from "@/utils/helpers";
import { Messages, StatusCodes } from "@/constants/constants";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookServiceImpl();
  }

  public welcomeMessage = (req: Request, res: Response): void => {
    sendResponse(res, StatusCodes.OK, Messages.WELCOME);
  };

  public getAllBooks = (req: Request, res: Response): void => {
    const books = this.bookService.getBooks();
    sendResponse(res, StatusCodes.OK, Messages.BOOKS_FETCHED, books);
  };

  public addBook = (req: Request, res: Response): void => {
    const { name, author, publishedYear } = req.body;
    const book = this.bookService.addBook({ name, author, publishedYear });
    sendResponse(res, StatusCodes.CREATED, Messages.BOOK_ADDED, book);
  };

  public updateBook = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { name, author, publishedYear } = req.body;
    const updatedBook = this.bookService.updateBook(Number(id), {
      name,
      author,
      publishedYear,
    });

    if (updatedBook) {
      sendResponse(res, StatusCodes.OK, Messages.BOOK_UPDATED, updatedBook);
    } else {
      sendResponse(res, StatusCodes.NOT_FOUND, Messages.BOOK_NOT_FOUND);
    }
  };

  public deleteBook = (req: Request, res: Response): void => {
    const { id } = req.params;
    this.bookService.deleteBook(Number(id));
    sendResponse(res, StatusCodes.NO_CONTENT, Messages.BOOK_DELETED);
  };
}
