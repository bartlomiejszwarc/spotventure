'use client';

import {useUserContext} from '@/hooks/context/useUserContext';
import {useEffect, useState} from 'react';

interface Props {
  uid: string;
}
export default function NoResults({uid}: Props) {
  const {user} = useUserContext();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUserLoaded(true);
    }
  }, [user]);
  if (userLoaded) {
    if (user!?.uid === uid) {
      return (
        <div>
          <span className='text-2xl font-thin'>You have not added any posts yet</span>
        </div>
      );
    } else {
      return (
        <div>
          <span className='text-2xl font-thin'>This user has not added any posts yet</span>
        </div>
      );
    }
  }
}
