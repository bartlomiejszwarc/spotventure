import Image from 'next/image';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {IPost} from './../../../interfaces/postInterface';
import {parseISO, format} from 'date-fns';
import Link from 'next/link';
import {useUserContext} from '@/hooks/context/useUserContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState, useEffect} from 'react';
import {useUserData} from '@/hooks/user/useUserData';
import {useAddToFavorites} from '@/hooks/user/favorites/useAddToFavorites';
import {useRemoveFromFavorites} from '@/hooks/user/favorites/useRemoveFromFavorites';

interface IPostPreview {
  id: string | undefined;
  uid: string;
  imageUrl: string;
  location: string;
  visitDate: Date | undefined;
  likedByIds: string[];
  profileImageUrl?: string | undefined;
  username?: string;
}

function PostPreviewCard({
  id,
  uid,
  imageUrl,
  location,
  visitDate,
  likedByIds,
  profileImageUrl,
  username,
}: IPostPreview) {
  const [name, setName] = useState<string>('');

  const {getUserData} = useUserData();

  useEffect(() => {
    const getUserDataFromUid = async () => {
      const res = await getUserData(uid);
      if (res) setName(res.data.user.name);
    };

    getUserDataFromUid();
  }, [uid]);

  const Likes = () => {
    const {user, dispatch} = useUserContext();
    const [processing, setProcessing] = useState<boolean>(false);
    const {addToFavorites} = useAddToFavorites();
    const {removeFromFavorites} = useRemoveFromFavorites();
    const [likedByIdsState, setLikedByIdsState] = useState<string[]>(likedByIds);
    const [favoriteActionType, setFavoriteActionType] = useState<string>('');

    const addPostToFavorites = async () => {
      if (user) {
        dispatch({type: 'ADD_TO_USER_FAVORITES', payload: id});
        likedByIdsState.push(user.uid);
        if (!processing) {
          try {
            setProcessing(true);
            const res = await addToFavorites(id as string, uid);
            if (res) {
              window.setTimeout(() => {
                setProcessing(false);
              }, 1000);
            }
          } catch (e) {
            window.setTimeout(() => {
              setProcessing(false);
            }, 1000);
          }
        }
      }
    };

    const removePostFromFavorites = async () => {
      if (user) {
        dispatch({type: 'REMOVE_FROM_USER_FAVORITES', payload: id});
        const updated = likedByIdsState.filter((userId) => userId !== user.uid);
        setLikedByIdsState(updated);
        if (!processing) {
          try {
            setProcessing(true);
            const res = await removeFromFavorites(id as string, uid);
            if (res) {
              window.setTimeout(() => {
                setProcessing(false);
              }, 1000);
            }
          } catch (e) {
            window.setTimeout(() => {
              setProcessing(false);
            }, 1000);
          }
        }
      }
    };

    return (
      <div className='flex space-x-1 items-center'>
        {user?.likedPosts?.includes(id as string) ? (
          <FavoriteIcon className='text-xl text-rose-600 cursor-pointer' onClick={removePostFromFavorites} />
        ) : (
          <FavoriteBorderIcon className='text-xl text-rose-600 cursor-pointer' onClick={addPostToFavorites} />
        )}
        <span className='font-medium'>{likedByIdsState.length}</span>
      </div>
    );
  };

  const UserProfileImage = () => {
    return (
      <Avatar>
        {profileImageUrl ? <AvatarImage src={profileImageUrl} /> : <AvatarImage src='https://github.com/shadcn.png' />}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
  };

  const UsernameLink = () => {
    return (
      <Link href={`/profile/${uid}`} className='text-zinc-800 font-[500] max-w-52 truncate text-sm lg:text-lg'>
        {name}
      </Link>
    );
  };

  if (name) {
    return (
      <div className='w-full sm:w-64 md:w-72 h-[12rem] lg:h-[17rem] border-0 rounded-xl border-zinc-400 relative bg-zinc-100 shadow-md shadow-zinc-400 '>
        <div className='h-3/5 lg:h-[70%] relative'>
          <div className='absolute inset-0'>
            <Image className='rounded-t-xl' layout='fill' objectFit='cover' src={imageUrl} alt='Place' />
          </div>
          <div className='absolute right-1/2 translate-x-1/2 bottom-0 translate-y-[50%]'>
            <UserProfileImage />
          </div>
        </div>
        <div className='absolute flex w-full justify-between px-3 pt-1 text-zinc-700'>
          <div className='flex space-x-1 items-center'>
            <AccessTimeIcon className='text-sm lg:text-lg' />
            <span className='truncate text-xxs md:text-xs xl:text-sm'>
              <time dateTime={visitDate!?.toString()}>{format(visitDate!?.toString(), 'LLLL d, yyyy')}</time>
            </span>
          </div>
          <div className='flex space-x-1 items-center max-w-[75px] lg:max-w-[110px] '>
            <PlaceIcon className='text-sm lg:text-lg' />
            <span className='truncate text-xxs md:text-xs xl:text-sm'>{location}</span>
          </div>
        </div>
        <div className='flex flex-col w-full items-center pt-6 overflow-hidden'>
          <UsernameLink />
          <Likes />
        </div>
      </div>
    );
  }
}

export default PostPreviewCard;
