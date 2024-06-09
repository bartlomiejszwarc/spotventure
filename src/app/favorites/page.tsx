'use client';
import PostPreviewCard from '@/components/ui/card/post/post-preview-card';
import {useGetPostData} from '@/hooks/post/useGetPostData';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useEffect, useState} from 'react';
import {IPost} from '@/interfaces/post-interface';
import LayoutPosts from '@/layouts/layout-posts';

export default function Page() {
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
            likedByIds={post?.likedByIds}
          />
        ))}
      </LayoutPosts>
    </div>
  );
}
