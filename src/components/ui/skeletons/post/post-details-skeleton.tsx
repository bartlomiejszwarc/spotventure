import {Skeleton} from '@/components/ui/skeleton';
import PostDescriptionSkeleton from './post-description-skeleton';
import PostRepliesSkeleton from './post-replies-skeleton';
import PostUserInfoSkeleton from './post-user-info-skeleton';

export default function PostDetailsSkeleton() {
  return (
    <div className='flex flex-col lg:flex-row '>
      <div className='relative w-[22rem] xs:w-96 h-[15rem] lg:h-[50rem] sm:w-[40rem] sm:border-[1px] sm:border-b-0 lg:border-b-[1px] lg:border-r-0 border-zinc-300 dark:border-zinc-700 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-md '>
        <Skeleton className='w-full h-96 rounded-none ' />
      </div>
      <div className=' relative w-[22rem] xs:w-96 h-[35rem] lg:h-[50rem] sm:w-[40rem] lg:w-[25rem] sm:border-[1px] border-l-0 border-zinc-300 dark:border-zinc-700 flex flex-col shadow-md bg-zinc-100 dark:bg-zinc-900 '>
        <div>
          <PostUserInfoSkeleton />
          <PostDescriptionSkeleton />
        </div>
        <PostRepliesSkeleton />

        <div className='w-full bg-zinc-100 dark:bg-zinc-900'></div>
      </div>
    </div>
  );
}
