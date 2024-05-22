import axios from 'axios';

export const useUserData = () => {
  const getUserData = async (id: string) => {
    try {
      await axios.get(`/api/users/${id}`);
    } catch (error) {}
  };

  return {getUserData};
};
