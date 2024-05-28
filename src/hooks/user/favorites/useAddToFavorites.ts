import axios from 'axios';

export const useAddToFavorites = () => {
  const addToFavorites = async (id: string, userId: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.post(`/api/users/${userId}/favorites`, id, {headers: headers});
    } catch (error) {}
  };

  return {addToFavorites};
};
