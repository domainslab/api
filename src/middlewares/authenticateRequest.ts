import { NextFunction, Request } from 'express';
import { Response } from 'express-serve-static-core';
import { decrypt } from '../utils/cipher';
import { isDev } from '../utils/isDev';

export const authenticateRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Skip auth when running server only
  if (isDev()) {
    return next();
  }

  const now = new Date().getTime();

  const publicKey = req.header('X-DomainsLab-Auth');
  if (!publicKey || publicKey.length === 0) {
    return res.status(401).json({ error: 'Not authrozied' });
  }

  if (process.env.AUTH_HACK_KEY && publicKey === process.env.AUTH_HACK_KEY) {
    return next();
  }

  if (!process.env.AUTH_SECRET_KEY) {
    return res.status(401).json({ error: 'Not authrozied' });
  }

  const signature = decrypt(publicKey, process.env.AUTH_SECRET_KEY);
  if (!signature) {
    return res.status(401).json({ error: 'Not authrozied' });
  }

  let requestTimestamp = 0;
  try {
    requestTimestamp = parseInt(signature);
  } catch (e) {
    return res.status(401).json({ error: 'Not authrozied' });
  }

  // request ttl 30 seconds
  if (Math.abs(now - requestTimestamp) > 30 * 1000) {
    return res.status(401).json({ error: 'Not authrozied' });
  }

  return next();
};
