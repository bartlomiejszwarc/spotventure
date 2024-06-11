'use client';
import SidenavField from './sidenav-field';
import {ISidenavField} from './sidenav-field';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ExploreIcon from '@mui/icons-material/Explore';
import CreatePostDialog from '../post/dialog/create-post-dialog';
import {useUserContext} from '@/hooks/context/useUserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import {useLogout} from '@/hooks/auth/useLogout';
import {useTheme} from 'next-themes';
import {Switch} from '../switch';
import {ThemeSwitch} from '../theme-switch';
interface ISidenavFieldListProps {
  isSidenavOpen: boolean;
}

function SidenavFieldList({isSidenavOpen}: ISidenavFieldListProps) {
  const {theme, setTheme} = useTheme();
  const {user} = useUserContext();
  const {logoutUser} = useLogout();

  const fieldList: ISidenavField[] = [
    {icon: <HomeIcon className='text-3xl' />, title: 'Home', route: '/home', iconOnly: isSidenavOpen},
    {icon: <ExploreIcon className='text-3xl' />, title: 'Explore', route: '/explore', iconOnly: isSidenavOpen},
    {
      icon: <AccountCircleIcon className='text-3xl' />,
      title: 'Profile',
      route: `${user ? '/profile/' + user!.uid : '/signin'}`,
      iconOnly: isSidenavOpen,
    },
    {icon: <FavoriteIcon className='text-3xl' />, title: 'Favorites', route: '/favorites', iconOnly: isSidenavOpen},
    {
      icon: <NotificationsIcon className='text-3xl' />,
      title: 'Notifications',
      route: '/notifications',
      iconOnly: isSidenavOpen,
    },
    {icon: <SettingsIcon className='text-3xl' />, title: 'Settings', route: '/settings', iconOnly: isSidenavOpen},
  ];
  return (
    <div className='flex flex-col justify-between h-full '>
      <div className='flex flex-col space-y-6 pt-24 pl-4'>
        {fieldList.map((field, id) => (
          <SidenavField icon={field.icon} title={field.title} route={field.route} key={id} iconOnly={!isSidenavOpen} />
        ))}
        <CreatePostDialog isSidenavOpen={isSidenavOpen} />
      </div>
      <div className='w-full flex flex-col space-y-6'>
        <div className='pl-3'>
          <ThemeSwitch />
        </div>
        <div className='pl-4 pb-4 cursor-pointer' onClick={logoutUser}>
          <SidenavField icon={<LogoutIcon className='text-3xl p-1' />} title={'Logout'} iconOnly={!isSidenavOpen} />
        </div>
      </div>
    </div>
  );
}
export default SidenavFieldList;
