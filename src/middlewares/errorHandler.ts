import { Request, Response } from 'express';

interface ApiError extends Error {
  status?: number;
}

export const errorHandler = (
  error: ApiError,
  request: Request,
  response: Response
) => {
  console.log(`Error ${error.message}`);

  const status = error.status || 400;
  response.status(status).send(error.message);
};
