import axios from 'axios';

export const useNotifications = () => {
  const getUserNotifications = async (id: string) => {
    try {
      const res = await axios.get(`/api/users/${id}/notifications`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res;
    } catch (error) {}
  };
  return {getUserNotifications};
};
