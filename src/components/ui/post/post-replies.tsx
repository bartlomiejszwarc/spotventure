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
        {postReplies?.map((reply, idx) => <PostReply key={idx} {...reply} />)}
      </div>
    </ScrollArea>
  );
}
