import axios from 'axios';
export const useAddToFavorites = () => {
  const addToFavorites = async (id: string, userId: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.post(`/api/users/${userId}/favorites`, {id: id}, {headers: headers});
      await axios.post(`/api/posts/${id}/favorites`, {uid: userId}, {headers: headers});
      return true;
    } catch (error) {
      return false;
    }
  };

  return {addToFavorites};
};
