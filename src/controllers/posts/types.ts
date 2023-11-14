import { Query, Send } from 'express-serve-static-core';
import { Request, Response } from 'express';

interface TypedRequest<T extends Query, U> extends Request {
  body: U;
  query: T;
}
interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export type GetPostsRequest = TypedRequest<
  {
    page_id: string;
    page_size?: string
  },
  never
>
export type GetPostsResponse = TypedResponse<any>
export type GetPostByIDRequest = TypedRequest<never, never>
export type GetPostByIDResponse = TypedResponse<any>
export type DeletePostRequest = TypedRequest<never, never>
export type DeletePostResponse = TypedResponse<any>

