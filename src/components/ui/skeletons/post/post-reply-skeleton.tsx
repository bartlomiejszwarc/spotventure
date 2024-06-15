import {Skeleton} from '@/components/ui/skeleton';

export default function PostReplySkeleton() {
  return (
    <div className='flex w-full'>
      <Skeleton className='w-10 h-10 rounded-full' />
      <div className='flex w-[80%] flex-col space-y-2 pl-4 pt-2'>
        <div className='flex space-x-1'>
          <Skeleton className='w-24 h-3' />
          <Skeleton className='w-full h-3' />
        </div>
        <Skeleton className='w-full h-3' />
      </div>
    </div>
  );
}
