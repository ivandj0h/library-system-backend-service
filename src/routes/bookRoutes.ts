import { Router } from "express";
import { BookController } from "../controllers/bookController";

class BookRoutes {
  public router: Router;
  private bookController: BookController;

  constructor() {
    this.router = Router();
    this.bookController = new BookController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.bookController.welcomeMessage);
    this.router.get("/books", this.bookController.getAllBooks);
    this.router.post("/books", this.bookController.addBook);
    this.router.put("/books/:id", this.bookController.updateBook);
    this.router.delete("/books/:id", this.bookController.deleteBook);
  }
}

export default new BookRoutes().router;
