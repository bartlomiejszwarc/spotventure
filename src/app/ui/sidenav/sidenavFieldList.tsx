import SidenavField from './sidenavField';
import {ISidenavField} from './sidenavField';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';

function SidenavFieldList() {
  const fieldList: ISidenavField[] = [
    {icon: <HomeIcon className='text-3xl' />, title: 'Home', route: '/home'},
    {icon: <AccountCircleIcon className='text-3xl' />, title: 'Profile', route: '/profile'},
    {icon: <NotificationsIcon className='text-3xl' />, title: 'Notification', route: '/notifications'},
    {icon: <FavoriteIcon className='text-3xl' />, title: 'Favorites', route: '/favorites'},
    {icon: <SettingsIcon className='text-3xl' />, title: 'Settings', route: '/settings'},
  ];
  return (
    <div className='flex flex-col space-y-6 pt-24 pl-6'>
      {fieldList.map((field, id) => (
        <SidenavField icon={field.icon} title={field.title} route={field.route} key={id} />
      ))}
    </div>
  );
}
export default SidenavFieldList;
