import {UserContext} from '@/context/user-context';
import {useContext} from 'react';

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error('useUserContext must be used inside an UserContextProvider');
  }
  return context;
};
