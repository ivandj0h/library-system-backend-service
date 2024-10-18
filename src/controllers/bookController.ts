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

  // Welcome message
  public welcomeMessage = (req: Request, res: Response): void => {
    sendResponse(res, StatusCodes.OK, Messages.WELCOME);
  };

  // Get all books
  public getAllBooks = async (req: Request, res: Response): Promise<void> => {
    const books = await this.bookService.getBooks();
    sendResponse(res, StatusCodes.OK, Messages.BOOKS_FETCHED, books);
  };

  // Get a book by id
  public getBookById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const book = await this.bookService.getBookById(id);

    if (book) {
      sendResponse(res, StatusCodes.OK, "Book fetched successfully", book);
    } else {
      sendResponse(res, StatusCodes.NOT_FOUND, Messages.BOOK_NOT_FOUND);
    }
  };

  // Add a book
  public addBook = async (req: Request, res: Response): Promise<void> => {
    const { name, author, publishedYear } = req.body;
    const result = await this.bookService.addBook({
      name,
      author,
      publishedYear,
    });

    if (typeof result === "string") {
      sendResponse(res, StatusCodes.BAD_REQUEST, result);
    } else {
      sendResponse(res, StatusCodes.CREATED, Messages.BOOK_ADDED, result);
    }
  };

  // Update a book
  public updateBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, author, publishedYear } = req.body;
    const updatedBook = await this.bookService.updateBook(id, {
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

  // Delete a book
  public deleteBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.bookService.deleteBook(id);
    sendResponse(res, StatusCodes.NO_CONTENT, Messages.BOOK_DELETED);
  };
}
