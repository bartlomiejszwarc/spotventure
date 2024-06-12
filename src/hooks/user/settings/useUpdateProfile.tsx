import {IUserProfileUpdate} from '@/interfaces/user-interface';
import axios from 'axios';
export default function useUpdateProfile() {
  const updateProfile = async (uid: string, body: IUserProfileUpdate) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const res = await axios.put(`/api/users/${uid}`, body, {headers: headers});
      return res.data.user;
    } catch (error) {}
  };
  return {updateProfile};
}
