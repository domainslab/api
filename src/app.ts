import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import { router } from './controllers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;
