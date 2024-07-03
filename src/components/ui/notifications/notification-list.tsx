'use client';
import {INotification} from '@/interfaces/notification-interface';
import Notification from './notification';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useEffect, useState} from 'react';
import {useNotifications} from '@/hooks/user/notifications/useNotifications';
import NotificationSkeleton from '../skeletons/notification-skeleton';
import NoResults from '../svgs/NoResults';
import {getAuth} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {useForceLogin} from '@/hooks/auth/useForceLogin';

function NotificationList() {
  const {user} = useUserContext();
  const {getUserNotifications} = useNotifications();
  const [notifications, setNotifications] = useState<INotification[] | null>([]);
  const [processed, setProcessed] = useState<boolean>(false);
  const {forceLogin} = useForceLogin();
  forceLogin();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        if (!user) throw Error('User not found');
        const res = await getUserNotifications(user.uid);
        setProcessed(true);
        if (!res) throw Error('Error occurred while getting notifications');
        setNotifications(res.data.notifications);
      } catch (e) {}
    };
    getNotifications();
  }, [user]);

  if (!processed) {
    return (
      <div className='flex flex-col space-y-4 pt-6'>
        {Array.from({length: 3}).map((_, idx) => (
          <NotificationSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (processed && notifications!?.length === 0) {
    return (
      <div className='w-full flex flex-col items-center space-y-5 pt-10 md:pt-16'>
        <NoResults className='w-44 h-44 md:h-64 md:w-64' />
        <span className='text-zinc-700 dark:text-zinc-400 md:text-xl dark:font-thin'>
          You do not have any notifications yet
        </span>
      </div>
    );
  }

  return (
    <div className='flex flex-col space-y-4 pt-6'>
      {notifications?.map((notification, idx) => <Notification key={idx} {...notification} />)}
    </div>
  );
}
export default NotificationList;
