import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import SideNav from '../components/ui/sidenav/sidenav';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Spotventure',
  description: 'A place where you can share a cool spot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className='min-h-screen font-roboto '>
          <div className='fixed z-30'>
            <SideNav />
          </div>
          <div className='flex min-h-screen'>
            <div className=' pt-24 md:pt-6 bg-zinc-200 md:pl-24 px-4 w-full '>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
