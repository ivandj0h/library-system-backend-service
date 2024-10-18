import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "@/routes/bookRoutes";
import { authenticate } from "@/middleware/auth";
import { logger } from "@/middleware/logger";
import { BaseURL } from "@/constants/constants";

dotenv.config();

class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.SERVICE_PORT) || 9000;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(logger);
  }

  private initializeRoutes() {
    this.app.use(BaseURL.API, authenticate, bookRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;
