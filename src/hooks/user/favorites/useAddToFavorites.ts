import {INotification} from '@/interfaces/notification-interface';
import axios from 'axios';
export const useAddToFavorites = () => {
  const addToFavorites = async (id: string, userId: string, body?: INotification) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.post(`/api/users/${userId}/favorites`, {id: id}, {headers: headers});
      await axios.post(`/api/posts/${id}/favorites`, {uid: userId}, {headers: headers});
      await axios.post(`/api/users/${userId}/notifications`, body, {headers: headers});
      return true;
    } catch (error) {
      return false;
    }
  };
  const likeReply = async (id: string, uid: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.post(`/api/users/${uid}/favorites/replies`, {id: id}, {headers: headers});
    } catch (error) {}
  };

  return {addToFavorites, likeReply};
};
