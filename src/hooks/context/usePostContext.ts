import {PostContext} from '@/context/post-context';
import {useContext} from 'react';

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw Error('usePostContext must be used inside an PostContextProvider');
  }
  return context;
};
