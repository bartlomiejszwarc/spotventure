import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {INotification} from '@/interfaces/notification-interface';
import {useUserData} from '@/hooks/user/useUserData';
import {useEffect, useState} from 'react';
import {IUser} from '@/interfaces/user-interface';
import UserAvatar from '@/components/ui/user-avatar';
import convertDate from '@/utils/convert-date';
import NotificationDescription from './notification-description';

function Notification(notification: INotification) {
  const {getUserData} = useUserData();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await getUserData(notification.senderId);
        if (!res) throw Error('Error occurred while fetching user data');
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    getUserDetails();
  }, [notification.senderId]);

  if (user && notification) {
    return (
      <>
        <div className='relative w-full h-24 flex flex-row items-center px-0 lg:px-6 space-x-4 bg-zinc-100 rounded-sm'>
          <span className='absolute top-2 right-4 text-sm text-zinc-500'>
            {convertDate(notification.createdAt, 'LLLL d, yyyy')}
          </span>
          <UserAvatar profileImageUrl={user.profileImageUrl} name={user.name} className='w-14 h-14' />
          <div className='flex flex-col w-full'>
            <div>
              <NotificationDescription
                type={notification.type}
                uid={user.uid}
                name={user.name}
                subjectId={notification.sourceId}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Notification;
