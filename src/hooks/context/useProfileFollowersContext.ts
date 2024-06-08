import {ProfileFollowersContext} from '@/context/profile-followers-context';
import {useContext} from 'react';

export const useProfileFollowersContext = () => {
  const context = useContext(ProfileFollowersContext);
  if (!context) {
    throw Error('useProfileFollowersContext must be used inside an ProfileFollowersContextProvider');
  }
  return context;
};
