import { Router } from 'express';
import { domainRouter } from './domains';
import { postsRouter } from './posts';

const V1 = '/v1';

const router = Router();
router.use(V1, domainRouter);
router.use(V1, postsRouter);
export { router };
