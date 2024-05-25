import axios from 'axios';

export const useGetUserPosts = () => {
  const getUserPosts = async (id: string) => {
    try {
      const res = await axios.get(`/api/users/${id}/posts`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res.data.posts;
    } catch (error) {}
  };

  return {getUserPosts};
};
