import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useFollowUser} from '@/hooks/user/follow/useFollowUser';
import AddIcon from '@mui/icons-material/Add';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Link from 'next/link';
interface Props {
  uid: string;
  name: string;
  profileImageUrl: string | undefined;
}
export default function UserPreviewCard({uid, name, profileImageUrl}: Props) {
  const UserAvatar = () => {
    return (
      <Avatar className='h-16 w-16'>
        {profileImageUrl ? (
          <AvatarImage src={profileImageUrl} className='' />
        ) : (
          <AvatarImage src='https://firebasestorage.googleapis.com/v0/b/spotventure-bc5b2.appspot.com/o/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg?alt=media&token=0a71dd9a-00e1-40fd-93c5-f0fc11fa9909' />
        )}
        <AvatarFallback className='text-3xl text-emerald-700 bg-zinc-50'>{name?.slice(0, 1)}</AvatarFallback>
      </Avatar>
    );
  };
  const {user, dispatch} = useUserContext();
  const {followUser, unfollowUser} = useFollowUser();
  const addToFollowing = async (event: any) => {
    event.stopPropagation();
    dispatch({type: 'ADD_TO_FOLLOWING', payload: uid});

    if (user!.uid && uid) await followUser(user!.uid, uid as string);
  };

  const removeFromFollowing = async (event: any) => {
    event.stopPropagation();
    dispatch({type: 'REMOVE_FROM_FOLLOWING', payload: uid});

    if (user!.uid && uid) await unfollowUser(user!.uid, uid as string);
  };

  return (
    <div className='relative h-full'>
      {user?.following?.includes(uid) ? (
        <PersonRemoveIcon
          className='absolute z-30 right-2 top-2 text-zinc-100 text-2xl bg-rose-600 opacity-80 rounded-full p-1'
          onClick={removeFromFollowing}
        />
      ) : (
        <AddIcon
          className='absolute z-30 right-2 top-2 text-zinc-100 text-2xl bg-emerald-600 opacity-85 rounded-full p-1'
          onClick={addToFollowing}
        />
      )}
      <Link
        href={`profile/${uid}`}
        className='relative h-24 w-full lg:h-48 lg:w-48 bg-zinc-100 dark:bg-zinc-900 flex items-center lg:justify-center px-6 lg:px-0 rounded-lg shadow-md shadow-zinc-300 dark:shadow-zinc-900/80'>
        <div className='flex flex-row lg:flex-col items-center h-full w-full space-x-3 lg:space-x-0'>
          <div className='lg:h-3/5 lg:w-full flex items-center lg:justify-center '>
            <UserAvatar />
          </div>
          <span className='lg:w-3/4 font-manrope font-medium dark:font-light tracking-wider lg:text-center line-clamp-2 text-ellipsis overflow-hidden text-zinc-800 dark:text-zinc-300'>
            {name}
          </span>
        </div>
      </Link>
    </div>
  );
}
