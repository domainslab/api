import { NextFunction, Request } from 'express';
import { Response } from 'express-serve-static-core';
import createHttpError from 'http-errors';

import { decrypt } from '../utils/cipher';
import { isDev } from '../utils/env';

const NotAuthorizedError = createHttpError(401, 'Not authorized');

export const authenticateRequestMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Skip auth when running server only
  if (isDev()) {
    return next();
  }

  const now = new Date().getTime();

  const publicKey = req.header('X-DomainsLab-Auth');
  if (!publicKey || publicKey.length === 0) {
    return next(NotAuthorizedError);
  }

  if (process.env.AUTH_HACK_KEY && publicKey === process.env.AUTH_HACK_KEY) {
    return next();
  }

  if (!process.env.AUTH_SECRET_KEY) {
    return next(NotAuthorizedError);
  }

  const signature = decrypt(publicKey, process.env.AUTH_SECRET_KEY);
  if (!signature) {
    return next(NotAuthorizedError);
  }

  let requestTimestamp = 0;
  try {
    requestTimestamp = parseInt(signature);
  } catch (e) {
    return next(NotAuthorizedError);
  }

  // request ttl 30 seconds
  if (Math.abs(now - requestTimestamp) > 30 * 1000) {
    return next(NotAuthorizedError);
  }

  return next();
};