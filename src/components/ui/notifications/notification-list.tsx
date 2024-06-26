'use client';
import {INotification} from '@/interfaces/notification-interface';
import Notification from './notification';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useEffect, useState} from 'react';
import {useNotifications} from '@/hooks/user/notifications/useNotifications';

interface INotificationList {
  notifications: INotification[];
}

function NotificationList() {
  const {user} = useUserContext();
  const {getUserNotifications} = useNotifications();
  const [notifications, setNotifications] = useState<INotification[] | null>([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        if (!user) throw Error('User not found');
        const res = await getUserNotifications(user.uid);
        if (!res) throw Error('Error occurred while getting notifications');
        setNotifications(res.data.notifications);
      } catch (e) {}
    };
    getNotifications();
  }, [user]);

  return (
    <div className='flex flex-col space-y-4 pt-6'>
      {notifications?.map((notification, idx) => <Notification key={idx} {...notification} />)}
    </div>
  );
}
export default NotificationList;
