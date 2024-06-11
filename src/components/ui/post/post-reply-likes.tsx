'use client';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useAddToFavorites} from '@/hooks/user/favorites/useAddToFavorites';
import {useRemoveFromFavorites} from '@/hooks/user/favorites/useRemoveFromFavorites';
import {useState} from 'react';
interface Props {
  id: string;
  uid: string;
  onAddLike: any;
}
export default function PostReplyLikes({id, uid, onAddLike}: Props) {
  const [processing, setProcessing] = useState<boolean>(false);
  const {user, dispatch} = useUserContext();
  const {likeReply} = useAddToFavorites();
  const {dislikeReply} = useRemoveFromFavorites();

  const handleLike = async () => {
    if (!processing) {
      if (user?.likedReplies!.includes(id)) {
        try {
          onAddLike(-1);
          dispatch({type: 'REMOVE_FROM_USER_LIKED_REPLIES', payload: id});
          await dislikeReply(id, uid);
          setProcessing(false);
        } catch (error) {
          setProcessing(false);
        }
      } else {
        try {
          onAddLike(1);
          dispatch({type: 'ADD_TO_USER_LIKED_REPLIES', payload: id});
          await likeReply(id, uid);
          setProcessing(false);
        } catch (error) {
          setProcessing(false);
        }
      }
    }
  };
  return (
    <button className=' flex pt-[2px] outline-none' onClick={handleLike}>
      {!user?.likedReplies!.includes(id) ? (
        <FavoriteBorderIcon className='text-[17px] text-zinc-700' />
      ) : (
        <FavoriteIcon className='text-[17px] text-rose-500' />
      )}
    </button>
  );
}
