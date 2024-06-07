'use client';
import PostLikes from '../card/post/postLikes';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import UserAvatar from '../user-avatar';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {ScrollArea} from '../scroll-area';
import {useEffect, useRef, useState} from 'react';
import {usePostContext} from '@/hooks/context/usePostContext';

interface Props {
  uid: string;
  id: string;
  likedByIds: string[];
  profileImageUrl: string | undefined;
  name: string;
}
export default function PostActions({id, uid, likedByIds, profileImageUrl, name}: Props) {
  const [textareaAutofocus, setTextAreaAutofocus] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {likesCount, dispatch} = usePostContext();

  useEffect(() => {
    dispatch({type: 'SET_POST_LIKES_COUNT', payload: likedByIds.length ? likedByIds.length : 0});
  }, [likedByIds]);
  useEffect(() => {
    if (textareaAutofocus && textareaRef.current) {
      textareaRef.current.focus();
      setTextAreaAutofocus(false);
    }
  }, [textareaAutofocus]);
  return (
    <div className='p-3 w-full border-t-[1px] border-zinc-300 flex flex-col space-y-1'>
      <div className='  flex space-x-4 items-end '>
        <PostLikes id={id} uid={uid} likedByIds={likedByIds} likesCountHidden={true} iconFontSize={'30px'} />
        <ChatBubbleOutlineIcon
          className='hover:opacity-70 cursor-pointer text-zinc-800'
          style={{fontSize: '28px'}}
          onClick={() => {
            setTextAreaAutofocus(true);
          }}
        />
      </div>
      <span className='font-bold'>
        {likesCount} {likesCount === 1 ? 'like' : 'likes'}
      </span>
      <div className='  flex space-x-4 items-start pt-4'>
        <UserAvatar profileImageUrl={profileImageUrl} name={name} className='w-12 h-12' />

        <TextareaAutosize
          ref={textareaRef}
          maxRows={6}
          placeholder='Add reply...'
          className='bg-transparent w-full outline-none'
          style={{resize: 'none'}}></TextareaAutosize>
      </div>
    </div>
  );
}
