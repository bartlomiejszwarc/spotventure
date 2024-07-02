'use client';
import PostLikes from '../card/post/post-likes';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import UserAvatar from '../user-avatar';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import {useEffect, useRef, useState} from 'react';
import convertDate from '@/utils/convert-date';
import SendIcon from '@mui/icons-material/Send';
import {IReply} from '@/interfaces/reply-interface';
import {useReply} from '@/hooks/reply/useReply';
import {INotification} from '@/interfaces/notification-interface';
import {useUserContext} from '@/hooks/context/useUserContext';

interface Props {
  postAuthorId: string;
  uid: string;
  id: string;
  likedByIds: string[];
  likesCount: number;
  profileImageUrl: string | undefined;
  name: string;
  createdAt: Date;
  onAddReply: any;
}
export default function PostActions({
  postAuthorId,
  id,
  uid,
  likedByIds,
  likesCount,
  profileImageUrl,
  name,
  createdAt,
  onAddReply,
}: Props) {
  const [textareaAutofocus, setTextAreaAutofocus] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {user} = useUserContext();
  const [replyValue, setReplyValue] = useState<string>('');
  const {sendReply} = useReply();
  const MAX_REPLY_LENGTH = 150;

  useEffect(() => {
    if (textareaAutofocus && textareaRef.current) {
      textareaRef.current.focus();
      setTextAreaAutofocus(false);
    }
  }, [textareaAutofocus]);

  const addReply = async () => {
    try {
      if (user) {
        const data: IReply = {
          uid: uid,
          sourceId: id,
          text: replyValue,
          createdAt: new Date(),
          likedByIds: [],
        };

        const body: INotification = {
          receiverId: postAuthorId,
          senderId: user.uid,
          sourceId: id,
          type: 'reply',
        };
        const res = await sendReply(data, user.uid, body);
        onAddReply(data);
        setReplyValue('');
      }
    } catch (error) {}
  };

  return (
    <div className='p-3 w-full border-t-[1px] border-zinc-300 dark:border-zinc-700 flex flex-col md:space-y-1 text-zinc-800 dark:text-zinc-300'>
      <div className='flex space-x-4 items-center'>
        <PostLikes
          id={id}
          uid={uid}
          likedByIds={likedByIds}
          likesCount={likesCount}
          likesCountHidden={false}
          iconFontSize={'30px'}
        />
        <ChatBubbleOutlineIcon
          sx={{fontSize: '28px'}}
          className='hover:opacity-70 cursor-pointer text-zinc-800 dark:text-zinc-300'
          onClick={() => {
            setTextAreaAutofocus(true);
          }}
        />
      </div>
      <div className='flex flex-col'>
        <span className=' text-xs'>{convertDate(createdAt, 'LLLL dd, yyyy')}</span>
      </div>
      <div className='relative flex space-x-4 items-start pt-4  '>
        <UserAvatar profileImageUrl={profileImageUrl} name={name} className='w-12 h-12' />

        <TextareaAutosize
          value={replyValue}
          onChange={(e) => setReplyValue(e.target.value)}
          ref={textareaRef}
          maxRows={6}
          maxLength={MAX_REPLY_LENGTH}
          placeholder='Add reply...'
          className='bg-transparent outline-none'
          style={{resize: 'none', width: '70%'}}></TextareaAutosize>
        <span className='absolute bottom-0 right-0 text-xs'>
          {replyValue.length}/{MAX_REPLY_LENGTH}
        </span>
      </div>
      <div className=' flex justify-end items-center'>
        {replyValue.length > 0 && (
          <button className=' rounded-full bg-emerald-500 flex h-8 w-8 justify-center items-center' onClick={addReply}>
            <SendIcon className='text-zinc-200  text-[20px]' />
          </button>
        )}
        {replyValue.length === 0 && (
          <button disabled className='rounded-full bg-zinc-400 flex h-8 w-8 justify-center items-center'>
            <SendIcon className='text-zinc-200 text-[20px]' />
          </button>
        )}
      </div>
    </div>
  );
}
