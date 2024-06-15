import {Skeleton} from '../../skeleton';

export default function PostDescriptionSkeleton() {
  return (
    <div className='flex flex-col p-3 py-5 space-y-4 border-b-[1px] border-zinc-300 dark:border-zinc-700'>
      <Skeleton className='w-36 h-4' />
      <div className='flex space-x-1'>
        <Skeleton className='w-16 h-4' />
        <Skeleton className='w-full h-4' />
      </div>
      <Skeleton className='w-full h-4' />
    </div>
  );
}
