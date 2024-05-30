import Logo from './logo/logo';
import MovingComponent from 'react-moving-text';
export default function LoadingSignScreen() {
  return (
    <>
      <div className='w-full h-full hidden lg:flex flex-col items-center justify-center space-y-10 text-zinc-200 font-thin text-xl'>
        <Logo size={100} />

        <MovingComponent
          sx={{color: 'white'}}
          className='text-zinc-200'
          type='typewriter'
          duration='10000ms'
          dataText={['Signing in...', '[elevator music]', 'Just count to 10.', 'Granting wishes...']}
        />
      </div>
      <div className='w-full h-full lg:hidden flex flex-col items-center justify-center space-y-10 text-zinc-200 font-thin text-xl'>
        <Logo size={70} />

        <MovingComponent
          sx={{color: 'white'}}
          className='text-zinc-200'
          type='typewriter'
          dataText={['Signing in...', '[elevator music]', 'Just count to 10.', 'Granting wishes...']}
        />
      </div>
    </>
  );
}
