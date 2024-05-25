import {useRouter} from 'next/navigation';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '@/firebase/config';

export const useForceLogin = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const forceLogin = async () => {
    try {
      if (!user) router.push('/signin');
    } catch (error: any) {
      throw Error(error);
    }
  };
  return {forceLogin};
};
