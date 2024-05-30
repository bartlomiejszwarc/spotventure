import axios from 'axios';

export const useSearchByKeyword = () => {
  const searchPostsByKeyword = async (keyword: string) => {
    try {
      const res = await axios.get(`/api/search/posts/${keyword}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res.data.posts;
    } catch (error) {}
  };
  const searchUsersByKeyword = async (keyword: string) => {
    try {
      const res = await axios.get(`/api/search/users/${keyword}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res.data.users;
    } catch (error) {}
  };

  return {searchPostsByKeyword, searchUsersByKeyword};
};
