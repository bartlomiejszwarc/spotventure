import axios from 'axios';

export default function useDeleteUserData() {
  const deleteUserData = async (uid: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const res = await axios.delete(`/api/users/${uid}`, {headers: headers});
    } catch (error) {}
  };
  return {deleteUserData};
}
