/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {useUserContext} from '@/hooks/context/useUserContext';
import {useGetFollowingPosts} from '@/hooks/user/following/useGetFollowingPosts';
import {IPost} from '@/interfaces/post-interface';
import {useEffect, useState} from 'react';
import PostDetails from '../post/post-details';

export default function FollowingPostsList() {
  const {user} = useUserContext();
  const {getFollowingPosts} = useGetFollowingPosts();
  const [posts, setPosts] = useState<IPost[] | []>([]);

  useEffect(() => {
    const getPosts = async () => {
      if (user) {
        try {
          const res = await getFollowingPosts(user.uid);
          setPosts(res);
        } catch (error) {}
      }
    };
    getPosts();
  }, [user]);
  if (posts) {
    return (
      <div className='py-16 w-full flex flex-col items-center space-y-10 '>
        {posts.map((post, idx) => (
          <PostDetails key={idx} id={post.id as string} />
        ))}
      </div>
    );
  }
}
