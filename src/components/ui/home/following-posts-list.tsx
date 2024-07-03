/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {useGetFollowingPosts} from '@/hooks/user/following/useGetFollowingPosts';
import {IPost} from '@/interfaces/post-interface';
import {useEffect, useState} from 'react';
import PostDetails from '../post/post-details';
import NoResults from '../svgs/NoResults';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import PostDetailsSkeleton from '../skeletons/post/post-details-skeleton';
import {getAuth} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import GoExploreSvg from '../svgs/go-explore-svg';

export default function FollowingPostsList() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const {getFollowingPosts} = useGetFollowingPosts();
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const [processed, setProcessed] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      if (user) {
        try {
          await getFollowingPosts(user.uid).then((res) => {
            setPosts(res);
            setProcessed(true);
          });
        } catch (error) {
          setProcessed(true);
        }
      }
    };
    getPosts();
  }, [user]);

  if (!user && !loading) {
    return (
      <div className='py-20 md:py-10 w-full  flex flex-col items-center justify-center space-y-10 '>
        <span className='text-zinc-700 dark:text-zinc-400 text-3xl font-thin text-center'>Uh-oh...</span>
        <div className='w-full flex justify-center'>
          <NoResults className=' w-64 h-80' />
        </div>

        <span className='text-zinc-700 dark:text-zinc-400 text-2xl font-medium text-center'>
          Nothing here, annonymous.
        </span>

        <Link
          href='/signin'
          className='font-normal  text-zinc-200 text-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg px-10 py-2'>
          Sign in here!
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

  if (posts?.length === 0 && processed) {
    return (
      <div className='py-20 md:py-10 w-full flex flex-col items-center space-y-10'>
        <span className='text-zinc-700 dark:text-zinc-400 text-2xl font-thin text-center'>Uh-oh...</span>
        <div className='w-full flex justify-center'>
          <NoResults className=' w-64 h-80' />
        </div>
        <span className='text-2xl text-center text-zinc-700 dark:text-zinc-400 '>
          Quite empty here. <br />
          Have you tried searching?
        </span>

        <Link
          href='/explore'
          className='font-normal  text-zinc-200 text-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg px-10 py-2'>
          <SearchIcon />
          Start here!
        </Link>
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
}
