'use client';
import {useGetUserPosts} from '@/hooks/post/useGetUserPosts';
import {useEffect, useState} from 'react';
import PostPreviewCard from '@/components/ui/card/postPreviewCard';
import {IPost} from './../../../interfaces/postInterface';
import {useUserData} from '@/hooks/user/useUserData';
import {IUser} from '@/database/actions/userAction';

export default function Page({params}: {params: {id: string}}) {
  const {getUserPosts} = useGetUserPosts();
  const {getUserData} = useUserData();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const getPosts = async () => {
      const res = await getUserPosts(params.id);
      if (res) setPosts(res);
    };
    const getUserDetails = async () => {
      const res = await getUserData(params.id);
      if (res) setUserData(res.data.user);
    };
    getPosts();
    getUserDetails();
  }, [params.id]);

  if (posts.length > 0) {
    return (
      <div className='flex flex-wrap gap-4'>
        {posts.map((post, idx) => (
          <PostPreviewCard
            key={idx}
            uid={params.id}
            imageUrl={post.imageUrl}
            location={post.location}
            visitDate={post.visitDate}
            likesCount={post.likesCount}
            profileImageUrl={userData?.profileImageUrl}
            username={userData?.name}
          />
        ))}
      </div>
    );
  }
}
