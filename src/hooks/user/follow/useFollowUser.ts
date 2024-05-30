import axios from 'axios';

export const useFollowUser = () => {
  const followUser = async (id: string, followId: string) => {
    try {
      const res = await axios.post(`/api/users/${id}/follow/${followId}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res;
    } catch (error) {}
  };
  const unfollowUser = async (id: string, followId: string) => {
    try {
      const res = await axios.put(`/api/users/${id}/follow/${followId}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res;
    } catch (error) {}
  };

  return {followUser, unfollowUser};
};
