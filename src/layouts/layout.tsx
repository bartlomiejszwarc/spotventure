'use client';
import {usePathname} from 'next/navigation';
import {auth} from '@/firebase/config';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useUserData} from '@/hooks/user/useUserData';
import {useEffect} from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [user, loading, error] = useAuthState(auth);
  // const {getUserData} = useUserData();

  // useEffect(() => {
  //   if (user!?.uid) getUserData(user!.uid);
  // }, [user]);

  if (path !== '/signin' && path !== '/signup')
    return (
      <div className='flex min-h-screen'>
        <div className='pt-24 md:pt-6 bg-zinc-200 md:pl-24 px-4 w-full'>
          <span>Hello, {user?.email}</span>
          {children}
        </div>
      </div>
    );
  else {
    return <div className='flex min-h-screen'>{children}</div>;
  }
}
