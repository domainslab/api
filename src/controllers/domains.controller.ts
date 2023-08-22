import { Router } from 'express';

import { getDomains, isDomainAvailable } from '../services';
import type {
  GetDomainStatusRequest,
  GetDomainStatusResponse,
  GetDomainsRequest,
  GetDomainsResponse,
} from './types';

const domainRouter = Router();

// /v1/domains?desc="{App description}"
domainRouter.get(
  '/domains',
  async (req: GetDomainsRequest, res: GetDomainsResponse) => {
    if (!req.query.desc) {
      return res.status(400).json({ error: 'Query param `desc` is required' });
    }

    const domains = await getDomains({
      desc: req.query.desc,
      tlds: req.query.tlds,
    });

    res.json({ domains });
  }
);

// /v1/domain_status?domain="{domain}"
domainRouter.get(
  '/domain_status',
  async (req: GetDomainStatusRequest, res: GetDomainStatusResponse) => {
    const domain = req.query.domain;

    if (!domain) {
      return res
        .status(400)
        .send({ error: 'Query param `domain` is required' });
    }

    const isAvailable = await isDomainAvailable(domain);

    res.json({ isAvailable });
  }
);

export { domainRouter };
