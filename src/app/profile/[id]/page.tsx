'use client';
import {useGetUserPosts} from '@/hooks/post/useGetUserPosts';
import {useEffect, useState} from 'react';
import PostPreviewCard from '@/components/ui/card/postPreviewCard';
import {IPost} from './../../../interfaces/postInterface';
import {useUserData} from '@/hooks/user/useUserData';
import {IUser} from '@/database/actions/userAction';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {format} from 'date-fns';
import {useUserContext} from '@/hooks/context/useUserContext';

export default function Page({params}: {params: {id: string}}) {
  const {getUserPosts} = useGetUserPosts();
  const {getUserData} = useUserData();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userData, setUserData] = useState<IUser>();
  const {user} = useUserContext();

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

  if (userData) {
    return (
      <div className='w-full flex justify-center '>
        <div className='flex flex-col items-center w-full lg:w-3/4 space-y-12 lg:space-y-24 '>
          <div className='w-full'>
            <div className='w-full flex space-x-16'>
              <div className='relative w-full'>
                <img className='w-full bg-zinc-500 h-44 lg:h-72 object-cover' src={posts[1]!?.imageUrl} />
                <Avatar className='h-24 w-24 lg:h-36 lg:w-36 absolute bottom-0 left-3 lg:left-10 translate-y-[50%] border-4 border-zinc-50'>
                  {userData!?.profileImageUrl ? (
                    <AvatarImage src={userData!?.profileImageUrl} />
                  ) : (
                    <AvatarImage src='https://github.com/shadcn.png' />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className='w-full  flex justify-end'>
              <div className='w-64  flex flex-col items-end font-light font-manrope break-all text-right'>
                <span className='text-2xl font-semibold'>{userData?.name}</span>
                <div className='flex space-x-3 font-medium'>
                  <span>{userData?.followers?.length} followers </span>
                  <span>{userData?.following?.length} following </span>
                </div>
                <span className='font-light text-xs lg:text-sm'>
                  Member since{' '}
                  <time dateTime={userData!.createdAt!?.toString()}>
                    {format(userData!.createdAt!?.toString(), 'LLLL yyyy')}
                  </time>
                </span>
                {userData?.uid === user!?.uid && (
                  <button className='px-3 py-1 bg-zinc-300 text-zinc-800 rounded-lg text-sm mt-4'>Edit profile</button>
                )}
              </div>
            </div>
          </div>
          {posts.length > 0 && (
            <div className='flex flex-wrap gap-4 justify-center md:justify-start'>
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
          )}
        </div>
      </div>
    );
  }
}
