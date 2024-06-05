import {ProfileFollowersContext} from '@/context/ProfileFollowersContext';
import {useContext} from 'react';

export const useProfileFollowersContext = () => {
  const context = useContext(ProfileFollowersContext);
  if (!context) {
    throw Error('useProfileFollowersContext must be used inside an ProfileFollowersContextProvider');
  }
  return context;
};
