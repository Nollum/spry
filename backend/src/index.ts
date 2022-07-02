import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();
import connectDB from './database';
import routes from './routes';

const app: Express = express();
const port = process.env.PORT;

connectDB();

app.use(cors({
    origin: process.env.CONSUMER_ORIGIN
}));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', routes);

const unknownEndpoint = (req: Request, res: Response) => {
    res.status(404).json({'error': 'unknown endpoint'});
};

app.use(unknownEndpoint);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});