import axios from 'axios';

export const useUserData = () => {
  const getUserData = async (id: string) => {
    try {
      const res = await axios.get(`/api/users/${id}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      return res;
    } catch (error) {}
  };

  return {getUserData};
};
