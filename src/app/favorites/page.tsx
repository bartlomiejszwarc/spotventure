'use client';
import PostPreviewCard from '@/components/ui/card/postPreviewCard';
import {useGetPostData} from '@/hooks/post/useGetPostData';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useState, useEffect} from 'react';
import {IPost} from '@/interfaces/postInterface';
export default function Page() {
  const {getPostData} = useGetPostData();
  const {user} = useUserContext();
  const Favorites = () => {
    const [userFavorites, setUserFavorites] = useState<IPost[]>([]);

    useEffect(() => {
      if (user?.likedPosts!?.length > 0) {
        const getFavorites = async () => {
          const favoritesPromises = user!?.likedPosts!?.map((postId) => getPostData(postId));
          const favorites = await Promise.all(favoritesPromises);
          setUserFavorites(favorites);
        };
        getFavorites();
      }
    }, [user]);
    return (
      <>
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
      </>
    );
  };
  return (
    <div className='flex flex-col space-y-6'>
      <div className='w-full flex flex-wrap gap-4 justify-center md:justify-start '>
        <Favorites />
      </div>
    </div>
  );
}
