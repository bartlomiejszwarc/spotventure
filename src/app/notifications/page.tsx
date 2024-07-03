import NotificationList from '@/components/ui/notifications/notification-list';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {getAuth} from 'firebase/auth';
import {Router} from 'lucide-react';
import {useRouter} from 'next/navigation';
function Page() {
  return (
    <div className='pt-20 md:pt-6 md:pl-6'>
      <div className='flex space-x-2 items-center text-2xl'>
        <NotificationsIcon
          className='text-zinc-200 dark:text-zinc-400 bg-zinc-400/70 dark:bg-zinc-700/70 w-10 h-10 p-1 rounded-lg'
          style={{fontSize: '1.953rem'}}
        />
        <span className='text-xl font-medium tracking-wide text-zinc-700 dark:text-zinc-300'>Notifications</span>
      </div>
      <NotificationList />
    </div>
  );
}
export default Page;
