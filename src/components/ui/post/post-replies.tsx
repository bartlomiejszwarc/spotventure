'use client';
import PostReply from './post-reply';
import {ScrollArea} from '../scroll-area';
import {useEffect} from 'react';
import {IReply} from '@/interfaces/reply-interface';
interface Props {
  postReplies: IReply[];
}
export default function PostReplies({postReplies}: Props) {
  return (
    <ScrollArea className='h-full overflow-y-auto'>
      <div className='p-3 flex flex-col space-y-3 '>
        {postReplies.length === 0 && (
          <div className='w-full flex justify-center pt-2'>
            <span className='dark:font-thin text-zinc-600 dark:text-zinc-400'>This spot has no replies yet</span>
          </div>
        )}
        {postReplies?.map((reply, idx) => (
          <PostReply key={idx} isLast={idx === postReplies!?.length - 1} reply={reply} />
        ))}
      </div>
    </ScrollArea>
  );
}
