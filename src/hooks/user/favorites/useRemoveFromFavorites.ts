import axios from 'axios';
export const useRemoveFromFavorites = () => {
  const removeFromFavorites = async (id: string, userId: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.put(`/api/users/${userId}/favorites`, {id: id}, {headers: headers});
      await axios.put(`/api/posts/${id}/favorites`, {uid: userId}, {headers: headers});
      return true;
    } catch (error) {
      return false;
    }
  };

  return {removeFromFavorites};
};
