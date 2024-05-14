import Notification from './notification';
import {INotification} from './notification';

interface INotificationList {
  notifications: INotification[];
}

function NotificationList() {
  return (
    <div className='flex flex-col space-y-4'>
      <Notification />
      <Notification />
      <Notification />
      <Notification />
      <Notification />
    </div>
  );
}
export default NotificationList;
