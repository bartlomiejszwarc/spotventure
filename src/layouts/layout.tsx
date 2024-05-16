'use client';
import {usePathname} from 'next/navigation';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  if (path !== '/signin' && path !== '/signup')
    return (
      <div className='flex min-h-screen'>
        <div className='pt-24 md:pt-6 bg-zinc-200 md:pl-24 px-4 w-full'>{children}</div>
      </div>
    );
  else {
    return <div className='flex min-h-screen'>{children}</div>;
  }
}
