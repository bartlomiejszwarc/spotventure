'use client';
import {usePathname} from 'next/navigation';
import {auth} from '@/firebase/config';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useUserData} from '@/hooks/user/useUserData';
import {useEffect} from 'react';
import {UserContextProvider} from '@/context/user-context';
import {PostContextProvider} from '@/context/post-context';
import {ProfileFollowersProvider} from '@/context/profile-followers-context';

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
              <div className='bg-zinc-200 dark:bg-zinc-800 md:pl-24 px-[24px] w-full'>{children}</div>
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
