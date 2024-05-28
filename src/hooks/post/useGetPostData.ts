import axios from 'axios';

export const useGetPostData = () => {
  const getPostData = async (id: string) => {
    try {
      const res = await axios.get(`/api/posts/${id}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res.data.post;
    } catch (error) {}
  };

  return {getPostData};
};
