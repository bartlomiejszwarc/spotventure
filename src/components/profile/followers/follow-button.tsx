'use client';
import {useProfileFollowersContext} from '@/hooks/context/useProfileFollowersContext';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useFollowUser} from '@/hooks/user/follow/useFollowUser';
import {useState} from 'react';

interface Props {
  uid: string;
}
export default function FollowButton({uid}: Props) {
  const {user, dispatch} = useUserContext();
  const {dispatch: followDispatch} = useProfileFollowersContext();

  const {followUser, unfollowUser} = useFollowUser();
  const [hover, setHover] = useState<boolean>(false);
  const addToFollowing = async () => {
    dispatch({type: 'ADD_TO_FOLLOWING', payload: uid});
    followDispatch({type: 'ADD_TO_PROFILE_FOLLOWERS', payload: uid});
    setHover(false);
    if (user!.uid && uid) await followUser(user!.uid, uid);
  };

  const removeFromFollowing = async () => {
    dispatch({type: 'REMOVE_FROM_FOLLOWING', payload: uid});
    followDispatch({type: 'REMOVE_FROM_PROFILE_FOLLOWERS', payload: uid});
    if (user!.uid && uid) await unfollowUser(user!.uid, uid);
  };

  return (
    <>
      {user?.uid !== uid && (
        <>
          {!user?.following!?.includes(uid) ? (
            <button
              className='py-2 w-28 bg-emerald-500 text-zinc-200 font-medium rounded-full text-base mt-4 border-2 border-transparent'
              onClick={addToFollowing}>
              Follow
            </button>
          ) : (
            <button
              className={`py-2 w-28 ${hover ? 'text-red-400 ' : 'text-emerald-500'} bg-zinc-200 font-medium rounded-full text-base mt-4 border-2 ${hover ? 'border-red-400 ' : 'border-emerald-500'}`}
              onClick={removeFromFollowing}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
              {hover ? 'Unfollow' : 'Following'}
            </button>
          )}
        </>
      )}
    </>
  );
}
