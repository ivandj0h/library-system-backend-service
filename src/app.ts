import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bookRoutes from "@/routes/bookRoutes";

dotenv.config();

class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.SERVICE_PORT) || 3000;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeRoutes() {
    this.app.use("/api", bookRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App();
app.listen();
