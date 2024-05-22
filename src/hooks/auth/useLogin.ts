'use client';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';

import {useState} from 'react';

import {auth} from '@/firebase/config';

export const useLogin = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [processing, setProcessing] = useState(false);
  const loginUser = async (email: string, password: string) => {
    try {
      setProcessing(true);
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) {
        setProcessing(false);
        throw Error('Invalid credentials');
      }
      setProcessing(false);

      return res;
    } catch (error) {
      throw Error('Invalid credentials');
    }
  };

  return {loginUser, processing};
};
