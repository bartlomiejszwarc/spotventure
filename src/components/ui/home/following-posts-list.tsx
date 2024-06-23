/* eslint-disable react-hooks/exhaustive-deps */
import {useGetFollowingPosts} from '@/hooks/user/following/useGetFollowingPosts';
import NoResults from '../svgs/NoResults';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import dynamic from 'next/dynamic';
import {cookies} from 'next/headers';
import {Key} from 'react';
import {IPost} from '@/interfaces/post-interface';

const PostDetailsComponent = dynamic(() => import('../post/post-details'));

async function Posts() {
  const cookieStore = cookies();
  const {getFollowingPosts} = useGetFollowingPosts();
  try {
    const uid = cookieStore.get('uid');
    if (uid!?.value) {
      const posts = await getFollowingPosts(uid.value);
      return posts;
    }
  } catch (error: any) {
    return null;
  }
}

export default async function FollowingPostsList() {
  const posts = await Posts();

  if (posts!?.length > 0) {
    return (
      <div className='py-8 w-full flex flex-col items-center space-y-10 '>
        {posts!?.map((post: IPost, idx: Key) => <PostDetailsComponent key={idx} id={post.id as string} />)}
      </div>
    );
  }
  if (posts?.length === 0) {
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
        <button className='text-zinc-700 dark:text-zinc-200 text-2xl font-thin bg-emerald-500 rounded-full px-10 py-2'>
          <Link href='/explore' className='font-normal'>
            <SearchIcon />
            Start here!
          </Link>
        </button>
      </div>
    );
  }
}
