'use client';
import {usePathname} from 'next/navigation';
import {auth} from '@/firebase/config';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useUserData} from '@/hooks/user/useUserData';
import {useEffect} from 'react';
import {UserContextProvider} from '@/context/UserContext';
import {PostContextProvider} from '@/context/PostContext';
import {ProfileFollowersProvider} from '@/context/ProfileFollowersContext';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [user, loading, error] = useAuthState(auth);

  if (path !== '/signin' && path !== '/signup')
    return (
      <UserContextProvider>
        <ProfileFollowersProvider>
          <PostContextProvider>
            <div className='flex min-h-screen font-manrope'>
              <div className='bg-zinc-200 md:pl-24 px-4 w-full'>{children}</div>
            </div>
          </PostContextProvider>
        </ProfileFollowersProvider>
      </UserContextProvider>
    );
  else {
    return (
      <UserContextProvider>
        <div className='flex min-h-screen font-manrope'>{children}</div>
      </UserContextProvider>
    );
  }
}
