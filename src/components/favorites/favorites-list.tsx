'use client';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useGetPostData} from '@/hooks/post/useGetPostData';
import {IPost} from '@/interfaces/post-interface';
import LayoutPosts from '@/layouts/layout-posts';
import {useState, useEffect} from 'react';
import PostPreviewCard from '../ui/card/post/post-preview-card';

export default function FavoritesList() {
  const {getPostData} = useGetPostData();
  const {user} = useUserContext();

  const [userFavorites, setUserFavorites] = useState<IPost[]>([]);
  const [processed, setProcessed] = useState<boolean>(false);

  useEffect(() => {
    if (user && !processed) {
      const fetchUserFavorites = async () => {
        try {
          if (user?.likedPosts!?.length > 0) {
            const favoritesPromises = user!.likedPosts!.map((postId: string) => getPostData(postId));
            const favorites = await Promise.all(favoritesPromises);
            const favoritesReversed = favorites.reverse();
            setUserFavorites(favoritesReversed);
            setProcessed(true);
          }
        } catch (error) {
          setProcessed(true);
        }
      };
      fetchUserFavorites();
    }
  }, [user]);

  return (
    <div className='pt-16 lg:pt-6'>
      <LayoutPosts>
        {userFavorites.map((post, idx) => (
          <PostPreviewCard
            key={idx}
            id={post?.id}
            uid={post?.uid}
            imageUrl={post?.imageUrl}
            location={post?.location}
            visitDate={post?.visitDate}
            likesCount={post.likesCount}
            likedByIds={post?.likedByIds}
          />
        ))}
      </LayoutPosts>
    </div>
  );
}
