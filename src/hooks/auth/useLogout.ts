import {useSignOut} from 'react-firebase-hooks/auth';
import {useState} from 'react';
import {auth} from '@/firebase/config';
import {useRouter} from 'next/navigation';

export const useLogout = () => {
  const [signOut] = useSignOut(auth);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const logoutUser = async () => {
    try {
      setProcessing(true);
      const res = await signOut();
      if (!res) {
        setProcessing(false);
        throw Error('Cannot sign out');
      }
      setProcessing(false);

      router.push('/signin');
    } catch (error: any) {
      throw Error(error);
    }
  };

  return {logoutUser, processing};
};
