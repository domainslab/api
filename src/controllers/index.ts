import { Router } from 'express';
import { domainRouter } from './domains.controller';

const V1 = '/v1';

const router = Router();
router.use(V1, domainRouter);

export { router };
