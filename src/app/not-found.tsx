import PageNotFoundSvg from '@/components/ui/svgs/PageNotFoundSvg';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='w-full min-h-screen h-screen flex flex-col space-y-10 items-center justify-center font-manrope'>
      <div className='flex flex-col items-center leading-snug'>
        <span className='text-3xl font-thin'>Uh-oh...</span>
        <span className='text-4xl font-thin'>This page does not exist</span>
      </div>
      <div className='w-96 h-96 inline-flex'>
        <PageNotFoundSvg />
      </div>
      <Link href='/home' className='px-10 bg-emerald-500 py-2 text-xl rounded-full text-zinc-100'>
        Go home
      </Link>
    </div>
  );
}
