'use client';
import PostLikes from '../card/post/postLikes';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import UserAvatar from '../user-avatar';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {ScrollArea} from '../scroll-area';
import {useEffect, useRef, useState} from 'react';

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

  useEffect(() => {
    if (textareaAutofocus && textareaRef.current) {
      textareaRef.current.focus();
      setTextAreaAutofocus(false);
    }
  }, [textareaAutofocus]);
  return (
    <div className='p-3 w-full border-t-[1px] border-zinc-300 flex flex-col space-y-4'>
      <div className='  flex space-x-2 items-end '>
        <PostLikes id={id} uid={uid} likedByIds={likedByIds} likesCountHidden={true} iconFontSize={'30px'} />
        <ChatBubbleOutlineIcon
          style={{fontSize: '28px'}}
          onClick={() => {
            setTextAreaAutofocus(true);
          }}
        />
      </div>
      <div className='  flex space-x-3 items-start '>
        <UserAvatar profileImageUrl={profileImageUrl} name={name} className='w-12 h-12' />

        <TextareaAutosize
          ref={textareaRef}
          maxRows={6}
          placeholder='Add reply...'
          className='bg-transparent w-full bg-red-500 outline-none'
          style={{resize: 'none'}}></TextareaAutosize>
      </div>
    </div>
  );
}
