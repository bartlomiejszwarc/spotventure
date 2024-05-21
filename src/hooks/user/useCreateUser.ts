import {IUser} from './../../database/actions/userAction';
import axios from 'axios';

export const useCreateUser = () => {
  const createUser = async (data: IUser) => {
    try {
      await axios.post('/api/users', data);
    } catch (error) {}
  };

  return {createUser};
};
