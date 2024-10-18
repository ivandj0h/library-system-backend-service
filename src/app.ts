import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

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
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Welcome to the Library API!');
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const app = new App();
app.listen();
