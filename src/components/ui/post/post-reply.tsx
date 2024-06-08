'use client';
import {IUser} from '@/interfaces/user-interface';
import {useUserData} from '@/hooks/user/useUserData';
import {IReply} from '@/interfaces/reply-interface';
import {useEffect, useState} from 'react';
import UserAvatar from '../user-avatar';
import convertDate from '@/utils/convert-date';

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
      <div className='flex space-x-4'>
        <div>
          <UserAvatar profileImageUrl={user?.profileImageUrl} name={user?.name as string} />
        </div>
        <div className='flex flex-col leading-tight'>
          <span className='text-xs font-semibold'>
            {user!.name}{' '}
            <span className='font-light text-xxs'>{convertDate(reply.createdAt, 'LLLL dd, yyyy HH:mm')}</span>
          </span>
          <span className='text-sm'>{reply.text}</span>
        </div>
      </div>
    );
}
