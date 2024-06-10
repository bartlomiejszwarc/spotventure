import axios from 'axios';

export const useSearchByKeyword = () => {
  const searchPostsByKeyword = async (keyword: string, orderBy?: string, order?: string) => {
    try {
      const res = await axios.get(`/api/search/posts/${keyword}`, {
        params: {orderBy: orderBy, order: order},
        headers: {
          Accept: 'application/json',
        },
      });
      return res.data.posts;
    } catch (error) {}
  };
  const searchUsersByKeyword = async (keyword: string, orderBy?: string, order?: string) => {
    try {
      const res = await axios.get(`/api/search/users/${keyword}`, {
        params: {orderBy: orderBy, order: order},
        headers: {
          Accept: 'application/json',
        },
      });
      return res.data.users;
    } catch (error) {}
  };

  return {searchPostsByKeyword, searchUsersByKeyword};
};
