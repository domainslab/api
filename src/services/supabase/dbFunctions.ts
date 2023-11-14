import supabase from './supabase';
import { getPagination } from '../../utils/getPagination';



export const getPostsByPage = async (pageNum: number, limit = 10)=> {
  const {from, to} = getPagination(pageNum, limit);
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .range(from, to);
  return { data,error, from, to };
};

export const getPostByID = async (id: number) => {
  const {data, error} = await supabase
    .from('posts')
    .select()
    .eq('id', id);
  return {data,error};

};
export const deletePostById = async (id: number) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  return error;
};
export const updatePosts = async ()=>{

};
