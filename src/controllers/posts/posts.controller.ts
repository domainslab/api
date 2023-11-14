import { NextFunction, Router } from 'express';
import createHttpError from 'http-errors';
import { deletePostById, getPostByID, getPostsByPage } from '../../services';
import {
  DeletePostRequest,
  DeletePostResponse,
  GetPostByIDRequest,
  GetPostByIDResponse,
  GetPostsRequest,
  GetPostsResponse,
} from './types';


const postsRouter = Router();

postsRouter.route('/posts')
  .get(
    async(
      req: GetPostsRequest,
      res: GetPostsResponse,
      next: NextFunction
    ) => {
      if(!req.query.page_id){
        return next(createHttpError(400, 'Query param `page_number` is required'));
      }
      const pageNumber = +req.query.page_id;
      const limit =  req.query.page_size? +req.query.page_size : 10;
      const data = await getPostsByPage(pageNumber, limit);
      res.json(data);
    }
  )
  .post(
    async(
      req,
      res
    )=>{
      // const data = await supabase.from('posts').insert({id:2, title:'Top 5 anime betrayals', content: 'Are you looking for top 5 anime betrayals?', pitch:'Trum-trum'});
      // res.json(data);
    }
  );
postsRouter.route('/posts/:id')
  .get(
    async(
      req: GetPostByIDRequest,
      res: GetPostByIDResponse,
      next: NextFunction
    )=>{
      const id = +req.params.id;
      const data = await getPostByID(id);
      res.json(data);
    }
  ).delete(
    async(
      req:DeletePostRequest,
      res:DeletePostResponse
    )=>{
      const id = +req.params.id;
      const data = await deletePostById(id);
      res.json(data);
    }
  );
export { postsRouter };
