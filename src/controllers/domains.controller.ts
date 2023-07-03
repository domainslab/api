import { Router, Request, Response } from 'express'

import { getDomains, isDomainAvailable } from '../services'

const domainRouter = Router()

// api/v1/domains?desc="{App description}"
domainRouter.get('/domains', async (req: Request, res: Response) => {
  const desc = req.query.desc as string | undefined

  if (!desc) { return res.status(400).json({ error: 'Query param `desc` is required' }) }

  const domains = await getDomains({ desc })

  res.json({ domains })
})

// api/v1/domain_status?domain="{domain}"
domainRouter.get('/domain_status', async (req: Request, res: Response) => {
  const domain = req.query.domain as string | undefined
  
  if (!domain) { return res.status(400).send({ error: 'Query param `domain` is required' }) }

  const isAvailable = await isDomainAvailable(domain)

  res.json({ isAvailable })
})

export { domainRouter }
