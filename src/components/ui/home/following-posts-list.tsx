/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {useUserContext} from '@/hooks/context/useUserContext';
import {useGetFollowingPosts} from '@/hooks/user/following/useGetFollowingPosts';
import {IPost} from '@/interfaces/post-interface';
import {useEffect, useState} from 'react';
import PostDetails from '../post/post-details';
import NoResults from '../svgs/NoResults';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import PostDetailsSkeleton from '../skeletons/post/post-details-skeleton';
import {getAuth} from 'firebase/auth';

export default function FollowingPostsList() {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const {user} = useUserContext();
  const {getFollowingPosts} = useGetFollowingPosts();
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const [processed, setProcessed] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      if (user) {
        try {
          await getFollowingPosts(user.uid).then((res) => {
            setPosts(res);
          });
          setProcessed(true);
        } catch (error) {}
      }
      if (!currentUser) {
        setProcessed(true);
      }
    };
    getPosts();
  }, [user]);

  if (!currentUser && processed) {
    return (
      <div className='py-20 md:py-10 w-full flex flex-col items-center space-y-10'>
        <span className='text-zinc-700 dark:text-zinc-400 text-xl font-thin'>
          Uh-oh... <br /> <span className='text-2xl'>There is nothing here, annonymous.</span>
        </span>
        <div className='w-full flex justify-center'>
          <NoResults className=' w-64 h-80' />
        </div>

        <Link
          href='/signin'
          className='font-normal text-zinc-700 dark:text-zinc-200 text-2xl bg-emerald-500 rounded-full px-10 py-2'>
          <SearchIcon />
          Sign up here!
        </Link>
      </div>
    );
  }

  if (!processed) {
    return (
      <div className='pt-8 overflow-y-clip space-y-10'>
        {Array.from({length: 2}).map((_, idx) => (
          <PostDetailsSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (posts?.length > 0) {
    return (
      <div className='py-8 w-full flex flex-col items-center space-y-10 '>
        {posts.map((post, idx) => (
          <PostDetails key={idx} id={post.id as string} />
        ))}
      </div>
    );
  }
  if (posts?.length === 0 && processed) {
    return (
      <div className='py-20 md:py-10 w-full flex flex-col items-center space-y-10'>
        <span className='text-zinc-700 dark:text-zinc-400 text-xl font-thin'>
          Uh-oh... <br />{' '}
          <span className='text-2xl'>
            Quite empty here. <br />
            Have you tried searching?
          </span>
        </span>
        <div className='w-full flex justify-center'>
          <NoResults className=' w-64 h-80' />
        </div>

        <Link
          href='/explore'
          className='font-normal text-zinc-700 dark:text-zinc-200 text-2xl bg-emerald-500 rounded-full px-10 py-2'>
          <SearchIcon />
          Start here!
        </Link>
      </div>
    );
  }
}
