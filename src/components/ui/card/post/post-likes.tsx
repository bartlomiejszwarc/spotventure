import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useAddToFavorites} from '@/hooks/user/favorites/useAddToFavorites';
import {useRemoveFromFavorites} from '@/hooks/user/favorites/useRemoveFromFavorites';
import {INotification} from '@/interfaces/notification-interface';
import {useEffect, useState} from 'react';

interface Props {
  id: string;
  likedByIds: string[];
  uid: string;
  likesCountHidden: boolean;
  iconFontSize?: string;
  likesCount: number;
}
export default function PostLikes({id, likedByIds, uid, likesCountHidden, likesCount, iconFontSize}: Props) {
  const {user, dispatch} = useUserContext();
  const [processing, setProcessing] = useState<boolean>(false);
  const {addToFavorites} = useAddToFavorites();
  const {removeFromFavorites} = useRemoveFromFavorites();
  const [likedByIdsState, setLikedByIdsState] = useState<string[]>(likedByIds);
  const [currentLikesCount, setCurrentLikesCount] = useState<number>(likesCount);

  const addPostToFavorites = async () => {
    if (user && !processing) {
      dispatch({type: 'ADD_TO_USER_FAVORITES', payload: id});
      likedByIdsState.push(user.uid);
      setCurrentLikesCount((prev) => prev + 1);
      if (!processing) {
        try {
          if (id === undefined || !id) throw Error('Missing post ID');
          const body: INotification = {
            receiverId: uid,
            senderId: user.uid,
            sourceId: id,
            type: 'like',
          };
          setProcessing(true);
          const res = await addToFavorites(id, user.uid, body);
          if (res) {
            setProcessing(false);
          }
        } catch (e) {
          setProcessing(false);
        }
      }
    }
  };

  const removePostFromFavorites = async () => {
    if (user && !processing) {
      dispatch({type: 'REMOVE_FROM_USER_FAVORITES', payload: id});
      const updated = likedByIdsState.filter((userId) => userId !== user.uid);
      setLikedByIdsState(updated);
      setCurrentLikesCount((prev) => prev - 1);
      if (!processing) {
        try {
          setProcessing(true);
          const res = await removeFromFavorites(id as string, user.uid);
          if (res) {
            setProcessing(false);
          }
        } catch (e) {
          setProcessing(false);
        }
      }
    }
  };

  return (
    <div className='flex space-x-1 items-center'>
      {user?.likedPosts?.includes(id as string) ? (
        <FavoriteIcon
          className={`text-xl text-rose-600 cursor-pointer `}
          style={{fontSize: iconFontSize}}
          onClick={removePostFromFavorites}
        />
      ) : (
        <FavoriteBorderIcon
          className={`text-xl text-rose-600 cursor-pointer `}
          style={{fontSize: iconFontSize}}
          onClick={addPostToFavorites}
        />
      )}
      {!likesCountHidden ? (
        <span className='font-medium text-zinc-800 dark:text-zinc-300'>{currentLikesCount}</span>
      ) : null}
    </div>
  );
}
