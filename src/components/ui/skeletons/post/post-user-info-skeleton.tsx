import {Skeleton} from '../../skeleton';

export default function PostUserInfoSkeleton() {
  return (
    <div className='p-3 border-b-[1px] border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 hidden md:flex items-center space-x-3'>
      <Skeleton className='h-10 w-10 rounded-full' />
      <Skeleton className='w-36 h-4' />
    </div>
  );
}
