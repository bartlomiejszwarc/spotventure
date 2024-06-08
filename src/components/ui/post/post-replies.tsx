'use client';
import {usePostContext} from '@/hooks/context/usePostContext';
import PostReply from './post-reply';
import {ScrollArea} from '../scroll-area';
import {useEffect} from 'react';
import {IReply} from '@/interfaces/reply-interface';
interface Props {
  postReplies: IReply[];
}
export default function PostReplies({postReplies}: Props) {
  const {replies, dispatch} = usePostContext();
  useEffect(() => {
    dispatch({type: 'SET_POST_REPLIES', payload: postReplies});
  }, []);

  return (
    <ScrollArea className='h-full overflow-y-auto'>
      <div className='p-3 flex flex-col space-y-3 '>
        {replies?.map((reply, idx) => <PostReply key={idx} {...reply} />)}
      </div>
    </ScrollArea>
  );
}
