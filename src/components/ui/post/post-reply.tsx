/* eslint-disable react-hooks/exhaustive-deps */
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
interface Props {
  reply: IReply;
  isLast: boolean;
}
export default function PostReply({reply, isLast}: Props) {
  const [user, setUser] = useState<IUser | null>(null);
  const [currentLikesCount, setCurrentLikesCount] = useState<number>(reply!?.likedByIds!?.length);
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
      <div className='flex flex-col text-zinc-800 dark:text-zinc-300'>
        <div className='flex space-x-0'>
          <div className='flex justify-between '>
            <UserAvatar profileImageUrl={user?.profileImageUrl} name={user?.name as string} />
          </div>
          <div className='flex flex-col leading-none w-full pl-4 pb-3  '>
            <div className='leading-tight w-full '>
              <span className='text-sm font-semibold'>{user!.name} </span>
              <span className='text-sm'>{reply.text}</span>
            </div>
            <div className='flex pt-[3px]'>
              <span className='font-light text-xs w-4 mr-3'>
                <ReactTimeAgo date={reply.createdAt as Date} locale='en-US' timeStyle='mini-now' />
              </span>
              <span className='font-medium text-xs'>
                {currentLikesCount === 1
                  ? `${convertLikesCount(currentLikesCount)} like`
                  : `${convertLikesCount(currentLikesCount)} likes`}
              </span>
            </div>
            {!isLast && <div className='h-[1px] w-full bg-zinc-200 dark:bg-zinc-800 mt-4'></div>}
          </div>
          <div className='w-auto '>
            <PostReplyLikes
              id={reply.id as string}
              uid={user.uid}
              onAddLike={(value: number) => {
                setCurrentLikesCount((prev) => prev + value);
              }}
            />
          </div>
        </div>
      </div>
    );
}
