'use client';
import {useProfileFollowersContext} from '@/hooks/context/useProfileFollowersContext';

export default function Followers() {
  const {followers, following} = useProfileFollowersContext();

  return (
    <div className='flex space-x-3 font-medium text-zinc-800 dark:text-zinc-300 dark:font-light'>
      <span>
        {followers!.length + ' '}
        {followers!.length === 1 ? 'follower' : 'followers'}{' '}
      </span>
      <span>{following!.length} following </span>
    </div>
  );
}
