'use client';
import PostPreviewCard from '@/components/ui/card/postPreviewCard';
import {useGetPostData} from '@/hooks/post/useGetPostData';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useEffect, useState} from 'react';
import {IPost} from '@/interfaces/postInterface';

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
            const favoritesPromises = user!.likedPosts!.map((postId) => getPostData(postId));
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
    <div className='flex flex-col space-y-6'>
      <div className='w-full flex flex-wrap gap-4 justify-center md:justify-start '>
        {userFavorites.map((post, idx) => (
          <PostPreviewCard
            key={idx}
            id={post?.id}
            uid={post.uid}
            imageUrl={post.imageUrl}
            location={post.location}
            visitDate={post.visitDate}
            likedByIds={post.likedByIds}
          />
        ))}
      </div>
    </div>
  );
}
