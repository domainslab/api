
import { Request, Response } from 'express'
import { Query, Send } from 'express-serve-static-core';

interface TypedRequest<T extends Query, U> extends Request {
  body: U,
  query: T
}

interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

export {
  TypedRequest,
  Request,
  TypedResponse,
  Response,
}