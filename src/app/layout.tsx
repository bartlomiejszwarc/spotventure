import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import SideNav from './ui/sidenav/sidenav';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Spotventure',
  description: 'A place where you can share a cool spot that you visited recently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className='flex h-screen md:flex-row'>
          <div className='absolute z-30'>
            <SideNav />
          </div>
          <div className='flex-grow pt-4 pl-20 md:pl-[100px] bg-zinc-200'>{children}</div>
        </div>
        /
      </body>
    </html>
  );
}
