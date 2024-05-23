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

interface ISidenavFieldListProps {
  isSidenavOpen: boolean;
}

function SidenavFieldList({isSidenavOpen}: ISidenavFieldListProps) {
  const fieldList: ISidenavField[] = [
    {icon: <HomeIcon className='text-3xl' />, title: 'Home', route: '/home', iconOnly: isSidenavOpen},
    {icon: <ExploreIcon className='text-3xl' />, title: 'Explore', route: '/explore', iconOnly: isSidenavOpen},
    {icon: <AccountCircleIcon className='text-3xl' />, title: 'Profile', route: '/profile', iconOnly: isSidenavOpen},
    {icon: <FavoriteIcon className='text-3xl' />, title: 'Favorites', route: '/favorites', iconOnly: isSidenavOpen},
    {
      icon: <NotificationsIcon className='text-3xl' />,
      title: 'Notifications',
      route: '/notifications',
      iconOnly: isSidenavOpen,
    },
    {icon: <SettingsIcon className='text-3xl' />, title: 'Settings', route: '/settings', iconOnly: isSidenavOpen},
  ];
  if (isSidenavOpen) {
    return (
      <div className='flex flex-col space-y-6 pt-24 pl-4'>
        {fieldList.map((field, id) => (
          <SidenavField icon={field.icon} title={field.title} route={field.route} key={id} iconOnly={!isSidenavOpen} />
        ))}
        <CreatePostDialog isSidenavOpen={isSidenavOpen} />
      </div>
    );
  }
  if (!isSidenavOpen) {
    return (
      <div className='flex flex-col space-y-6 pt-24 pl-4'>
        {fieldList.map((field, id) => (
          <SidenavField icon={field.icon} title={field.title} route={field.route} key={id} iconOnly={!isSidenavOpen} />
        ))}
        <CreatePostDialog isSidenavOpen={isSidenavOpen} />
      </div>
    );
  }
}
export default SidenavFieldList;
