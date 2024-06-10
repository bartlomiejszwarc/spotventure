import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useAddToFavorites} from '@/hooks/user/favorites/useAddToFavorites';
import {useRemoveFromFavorites} from '@/hooks/user/favorites/useRemoveFromFavorites';
import {INotification} from '@/interfaces/notification-interface';
import {useState} from 'react';
import {usePostContext} from '@/hooks/context/usePostContext';

interface Props {
  id: string;
  likedByIds: string[];
  likesCount: number;
  uid: string;
  likesCountHidden: boolean;
  iconFontSize?: string;
}
export default function PostLikes({id, likedByIds, likesCount, uid, likesCountHidden, iconFontSize}: Props) {
  const {user, dispatch} = useUserContext();
  const [processing, setProcessing] = useState<boolean>(false);
  const {addToFavorites} = useAddToFavorites();
  const {removeFromFavorites} = useRemoveFromFavorites();
  const [likedByIdsState, setLikedByIdsState] = useState<string[]>(likedByIds);
  const {dispatch: postDispatch} = usePostContext();

  const addPostToFavorites = async () => {
    if (user && !processing) {
      dispatch({type: 'ADD_TO_USER_FAVORITES', payload: id});
      postDispatch({type: 'INCREASE_LIKES_COUNT', payload: null});
      likedByIdsState.push(user.uid);
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
      postDispatch({type: 'DECREASE_LIKES_COUNT', payload: null});
      const updated = likedByIdsState.filter((userId) => userId !== user.uid);
      setLikedByIdsState(updated);
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
      {!likesCountHidden ? <span className='font-medium'>{likesCount}</span> : null}
    </div>
  );
}
