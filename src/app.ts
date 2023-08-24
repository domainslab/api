import express from 'express';
import cors from 'cors';

import { router } from './controllers';
import { authenticateRequestMiddleware } from './middlewares/authenticateRequest';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateRequestMiddleware, router);

app.use(errorHandler);

export default app;
