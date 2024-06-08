'use client';
import {IUser} from '@/interfaces/user-interface';
import axios from 'axios';
import {useState} from 'react';

export const useCreateUser = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const createUser = async (data: IUser) => {
    try {
      setProcessing(true);
      const headers = {
        'Content-Type': 'application/json',
      };
      await axios.post('/api/users', data, {headers: headers});
      setProcessing(false);
    } catch (error) {
      setProcessing(false);
    }
  };

  return {createUser, processing};
};
