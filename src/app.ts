import express from 'express';
import { router as domainRouter } from './controllers';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(domainRouter);
app.use(errorHandler);

export default app;
