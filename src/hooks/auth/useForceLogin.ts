'use client';
import {useRouter} from 'next/navigation';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useEffect} from 'react';
import {auth} from '@/firebase/config';

export const useForceLogin = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!user && !loading) {
        router.push('/signin');
      }
    }
  }, [user, router]);

  return {forceLogin: () => {}};
};
