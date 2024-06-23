import {Skeleton} from '../../skeleton';

export default function PostPreviewCardSkeleton() {
  return (
    <div className='relative h-[12rem] lg:h-[17rem]'>
      <div className='cursor-pointer h-[12rem] lg:h-[17rem] rounded-xl relative bg-zinc-100 dark:bg-zinc-900 shadow-lg shadow-zinc-300 dark:shadow-zinc-900/80 '>
        <div className='h-3/5 lg:h-[70%] relative'>
          <Skeleton className='w-full h-full bg-zinc-400 dark:bg-zinc-700 rounded-b-none rounded-t-lg' />
          <div className='absolute flex w-full h-full items-end justify-between px-3 pb-1 opacity-80'>
            <div className='flex space-x-1 bg-zinc-600/80 text-zinc-300 pr-[7px] pl-2 rounded-full bg-opacity-60 py-[2px]'>
              <span className='truncate text-xxs md:text-xs xl:text-sm '>{/* <Skeleton className='w-64' /> */}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full absolute top-0 translate-y-[7.2rem] lg:translate-y-[11.9rem] z-20 flex flex-col items-center bg-red-500'>
        <div className='flex flex-col absolute translate-y-[-50%] items-center z-20'>
          <div className='w-12 h-12 rounded-full bg-zinc-300 dark:bg-zinc-800'></div>
        </div>
        <div className='flex flex-col items-center pt-6 overflow-hidden absolute z-30'>
          <Skeleton className='w-32 h-4 mt-2' />
        </div>
      </div>
    </div>
  );
}
