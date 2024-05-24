import axios from 'axios';
import {IPost} from './../../interfaces/postInterface';

export const useCreatePost = () => {
  const createPost = async (data: IPost) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.post('/api/posts', data, {headers: headers});
    } catch (error) {}
  };

  return {createPost};
};
