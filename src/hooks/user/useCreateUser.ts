import {IUser} from './../../database/actions/userAction';
import axios from 'axios';

export const useCreateUser = () => {
  const createUser = async (data: IUser) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.post('/api/users', data, {headers: headers});
    } catch (error) {}
  };

  return {createUser};
};
