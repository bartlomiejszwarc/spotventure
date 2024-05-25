'use client';
import SidenavField from './sidenavField';
import {ISidenavField} from './sidenavField';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ExploreIcon from '@mui/icons-material/Explore';
import CreatePostDialog from '../post/dialog/createPostDialog';
import {useUserContext} from '@/hooks/context/useUserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import {useLogout} from '@/hooks/auth/useLogout';
interface ISidenavFieldListProps {
  isSidenavOpen: boolean;
}

function SidenavFieldList({isSidenavOpen}: ISidenavFieldListProps) {
  const {user} = useUserContext();
  const {logoutUser} = useLogout();

  const onLogout = () => {
    logoutUser();
  };
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
      <div className='pl-4 pb-4 cursor-pointer' onClick={logoutUser}>
        <SidenavField icon={<LogoutIcon />} title={'Logout'} iconOnly={!isSidenavOpen} />
      </div>
    </div>
  );
}
export default SidenavFieldList;
