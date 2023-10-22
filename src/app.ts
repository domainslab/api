import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

export default app;
