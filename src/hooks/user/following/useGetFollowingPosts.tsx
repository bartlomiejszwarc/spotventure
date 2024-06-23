import axios from 'axios';

export const useGetFollowingPosts = () => {
  const getFollowingPosts = async (id: string) => {
    try {
      const res = await axios.get(`${process.env.HOST}/api/users/${id}/following`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res.data.posts;
    } catch (error: any) {
      return null;
    }
  };

  return {getFollowingPosts};
};
