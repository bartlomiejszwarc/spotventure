'use client';
import {IUser} from '@/interfaces/user-interface';
import {useUserData} from '@/hooks/user/useUserData';
import {IReply} from '@/interfaces/reply-interface';
import {useEffect, useState} from 'react';
import UserAvatar from '../user-avatar';
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en';
import PostReplyLikes from './post-reply-likes';
import convertLikesCount from '@/utils/convertLikesCount';
TimeAgo.addLocale(en);

export default function PostReply(reply: IReply) {
  const [user, setUser] = useState<IUser | null>(null);
  const {getUserData} = useUserData();

  useEffect(() => {
    if (reply.uid) {
      const getUserDetails = async () => {
        try {
          const res = await getUserData(reply.uid);
          if (res) setUser(res?.data.user);
        } catch (error) {}
      };
      getUserDetails();
    }
  }, [reply.uid]);

  if (reply && user)
    return (
      <div className='flex flex-col'>
        <div className='flex space-x-0'>
          <div className='flex justify-between '>
            <UserAvatar profileImageUrl={user?.profileImageUrl} name={user?.name as string} />
          </div>
          <div className='flex flex-col leading-none w-full pl-4 '>
            <div className='leading-tight w-full '>
              <span className='text-sm font-semibold'>{user!.name} </span>
              <span className='text-sm'>
                {reply.text} {reply.text} {reply.text} {reply.text} {reply.text} {reply.text}
                {reply.text}
                {reply.text}
                {reply.text}{' '}
              </span>
            </div>
            <div className='flex space-x-2 pt-[3px]'>
              <span className='font-light text-xs'>
                <ReactTimeAgo date={reply.createdAt as Date} locale='en-US' timeStyle='mini-now' />
              </span>
              <span className='font-medium text-xs'>
                {reply.likedByIds?.length === 1
                  ? `${convertLikesCount(reply.likedByIds?.length)} like`
                  : `${convertLikesCount(reply.likedByIds?.length as number)} likes`}
              </span>
            </div>
          </div>
          <div className='w-auto '>
            <PostReplyLikes id={reply.id as string} uid={user.uid} />
          </div>
        </div>
      </div>
    );
}
