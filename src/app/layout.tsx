import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import SideNav from '../components/ui/sidenav/sidenav';
import Layout from '@/layouts/layout';
import {ThemeProvider} from 'next-themes';

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
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class'>
          <div className='min-h-screen font-manrope'>
            <div className='fixed z-30'>
              <SideNav />
            </div>
            <Layout>{children}</Layout>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
