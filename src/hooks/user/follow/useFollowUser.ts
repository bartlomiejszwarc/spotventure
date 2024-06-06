import {INotification} from '@/interfaces/notificationInterface';
import axios from 'axios';

export const useFollowUser = () => {
  const followUser = async (id: string, followId: string) => {
    try {
      const res = await axios.post(`/api/users/${id}/follow/${followId}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      if (!res) throw new Error('Error occured');
      const body: INotification = {
        receiverId: followId,
        senderId: id,
        sourceId: followId,
        type: 'follow',
      };
      await axios.post(`/api/users/${id}/notifications`, body, {
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
