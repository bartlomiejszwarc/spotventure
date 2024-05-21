import Background from '@/components/ui/background/background';

export default function LayoutSign({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen w-full justify-center items-center font-manrope'>
      <div className='fixed w-full h-screen -z-10 scale-150'>
        <Background />
      </div>
      <div className='w-full md:w-3/4 min-h-screen md:min-h-0 md:h-3/4 bg-zinc-950 bg-opacity-30 backdrop-blur-lg md:rounded-xl flex p-0 shadow-xl'>
        {children}
      </div>
    </div>
  );
}
