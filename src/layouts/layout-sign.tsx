'use client';
import Background from '@/components/ui/background/background';
import {auth} from '@/firebase/config';
import Logo from '@/components/ui/logo/logo';
import {useAuthState} from 'react-firebase-hooks/auth';
import MovingComponent from 'react-moving-text';

export default function LayoutSign({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, loading] = useAuthState(auth);

  const LoadingScreen = () => {
    return (
      <>
        <div className='w-full h-full hidden lg:flex flex-col items-center justify-center space-y-10 text-zinc-200 font-thin text-xl'>
          <Logo size={100} />

          <MovingComponent
            sx={{color: 'white'}}
            className='text-zinc-200'
            type='typewriter'
            duration='10000ms'
            dataText={['Loading...', '[elevator music]', 'Just count to 10.', 'Granting wishes...']}
          />
        </div>
        <div className='w-full h-full lg:hidden flex flex-col items-center justify-center space-y-10 text-zinc-200 font-thin text-xl'>
          <Logo size={70} />

          <MovingComponent
            sx={{color: 'white'}}
            className='text-zinc-200'
            type='typewriter'
            dataText={['Loading...', '[elevator music]', 'Just count to 10.', 'Granting wishes...']}
          />
        </div>
      </>
    );
  };

  return (
    <div className='flex min-h-screen w-full justify-center items-center font-manrope'>
      <div className='fixed w-full h-screen -z-10 scale-150'>
        <Background />
      </div>
      {loading && <LoadingScreen />}

      {!loading && (
        <div className='w-full md:w-3/4 min-h-screen md:min-h-0 md:h-3/4 bg-zinc-950 bg-opacity-30 backdrop-blur-lg md:rounded-xl flex p-0 shadow-xl'>
          {children}
        </div>
      )}
    </div>
  );
}
