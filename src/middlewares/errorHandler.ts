import { Request, Response, NextFunction } from 'express';
import { isHttpError, HttpError } from 'http-errors';
import HttpStatusCode from '../types/HttpStatusCode';

const DEFAULT_STATUS_CODE = 500;
const DEFAULT_MESSAGE = 'Api error';

const formatError = (status: HttpStatusCode, message: string) => {
  return {
    error: {
      status,
      message,
    },
  };
};

const errorHandler = (
  err: HttpError | Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
  }

  if (!isHttpError(err)) {
    return res
      .status(DEFAULT_STATUS_CODE)
      .json(formatError(DEFAULT_STATUS_CODE, `Unknown error: ${err.message}`));
  }

  // This can be removed if we monkey-patch interface CreateHttpError with required arguments
  const status = err.status || DEFAULT_STATUS_CODE;
  const message = err.message || DEFAULT_MESSAGE;

  return res.status(status).json(formatError(status, message));
};

export default errorHandler;
