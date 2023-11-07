import { NextFunction, Router } from 'express';
import createHttpError from 'http-errors';

import { getDomains, isDomainAvailable, isDescValid } from '../services';
import type {
  GetDomainStatusRequest,
  GetDomainStatusResponse,
  GetDomainsRequest,
  GetDomainsResponse,
} from './types';
import AiError from '../services/ai/AiError';

const domainRouter = Router();

// /v1/domains?desc="{App description}"
domainRouter.get(
  '/domains',
  async (
    req: GetDomainsRequest,
    res: GetDomainsResponse,
    next: NextFunction
  ) => {
    if (!req.query.desc) {
      return next(createHttpError(400, 'Query param `desc` is required'));
    }

    const descValid = await isDescValid(req.query.desc);
    if (!descValid) {
      return next(createHttpError(400, 'desc is not logic'));
    }

    let domains;
    try {
      domains = await getDomains({
        desc: req.query.desc,
        tlds: req.query.tlds?.split(','),
      });
    } catch (err) {
      if (err instanceof AiError) {
        return next(createHttpError(400, err.message));
      }
    }

    res.json({ domains });
  }
);

// /v1/domain_status?domain="{domain}"
domainRouter.get(
  '/domain_status',
  async (req: GetDomainStatusRequest, res: GetDomainStatusResponse, next) => {
    const domain = req.query.domain;

    if (!domain) {
      return next(createHttpError(400, 'Query param `domain` is required'));
    }

    const isAvailable = await isDomainAvailable(domain);

    res.json({ isAvailable });
  }
);

export { domainRouter };
