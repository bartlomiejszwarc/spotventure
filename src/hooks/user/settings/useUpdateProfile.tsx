import {IUserProfileUpdate} from '@/interfaces/user-interface';
import axios from 'axios';
export default function useUpdateProfile() {
  const updateProfile = async (uid: string, body: IUserProfileUpdate) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.put(`/api/users/${uid}`, body, {headers: headers});
    } catch (error) {}
  };
  return {updateProfile};
}
