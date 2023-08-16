import { Request, Response } from 'express';
import { Query, Send } from 'express-serve-static-core';

interface TypedRequest<T extends Query, U> extends Request {
  body: U;
  query: T;
}
interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export type GetDomainsRequest = TypedRequest<
  {
    desc: string;
    tlds?: string[];
  },
  never
>;

export type GetDomainsResponse = TypedResponse<{
  domains?: string[];
  error?: string;
}>;

export type GetDomainStatusRequest = TypedRequest<
  {
    domain: string;
  },
  never
>;

export type GetDomainStatusResponse = TypedResponse<{
  isAvailable?: boolean;
  error?: string;
}>;
