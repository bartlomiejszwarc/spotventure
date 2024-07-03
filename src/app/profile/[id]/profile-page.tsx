/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {useGetUserPosts} from '@/hooks/post/useGetUserPosts';
import {useEffect, useState} from 'react';
import {IPost} from '../../../interfaces/post-interface';
import {useUserData} from '@/hooks/user/useUserData';
import {IUser} from '@/interfaces/user-interface';
import EditProfileButton from '@/components/profile/edit-profile-button';
import Followers from '@/components/profile/followers/followers';
import FollowButton from '@/components/profile/followers/follow-button';
import MemberSince from '@/components/profile/member-since';
import UserAvatar from '@/components/ui/user-avatar';
import ProfilePosts from '@/components/profile/profile-posts';
import {useProfileFollowersContext} from '@/hooks/context/useProfileFollowersContext';
import Image from 'next/image';
import Nationality from '@/components/profile/nationality';
import {Skeleton} from '@mui/material';
import {useUserContext} from '@/hooks/context/useUserContext';
interface Props {
  id: string;
}
export default function ProfilePage({id}: Props) {
  const {getUserPosts} = useGetUserPosts();
  const {dispatch} = useProfileFollowersContext();
  const {getUserData} = useUserData();
  const {user} = useUserContext();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userData, setUserData] = useState<IUser>();
  const [processed, setProcessed] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  useEffect(() => {
    const getPosts = async () => {
      const res = await getUserPosts(id);
      if (res) setPosts(res);
    };
    const getUserDetails = async () => {
      const res = await getUserData(id);
      if (res?.data.user) {
        setUserData(res.data.user);
        const followers = res?.data.user.followers;
        const following = res?.data.user.following;
        dispatch({type: 'SET_PROFILE_FOLLOWERS', payload: {followers: followers, following: following}});
        setProcessed(true);
        setProcessing(false);
      } else {
        setNotFound(true);
        setProcessed(true);
        setProcessing(false);
      }
    };
    getPosts();
    getUserDetails();
  }, [id]);

  return (
    <div className='w-full flex justify-center pb-6'>
      <div className='flex flex-col items-center w-full lg:w-3/4 space-y-12 '>
        <div className='w-full'>
          <div className='w-full flex space-x-16'>
            <div className='relative w-full'>
              <div className='w-full h-44 lg:h-72 bg-zinc-500'>
                {userData!?.backgroundImageUrl ? (
                  <Image
                    quality={100}
                    fill={true}
                    alt='Background'
                    className='w-full bg-zinc-500 h-44 lg:h-72 object-cover object-center shadow-md shadow-zinc-300 dark:shadow-zinc-950/30'
                    src={userData!?.backgroundImageUrl}
                  />
                ) : (
                  <div className='w-full h-full bg-zinc-400 dark:bg-zinc-700' />
                )}
              </div>

              {userData ? (
                <UserAvatar
                  profileImageUrl={userData!?.profileImageUrl}
                  name={userData!?.name}
                  className='h-24 w-24 lg:w-36 lg:h-36 absolute translate-y-[-50%] left-6 lg:left-16  z-20'
                />
              ) : (
                <div className='h-24 w-24 lg:w-36 lg:h-36 absolute translate-y-[-50%] left-6 lg:left-16  z-20 bg-zinc-300 dark:bg-zinc-700 rounded-full'></div>
              )}

              <div className='h-[7rem] w-[7rem] lg:w-[10rem] lg:h-[10rem] absolute translate-y-[-50%] left-4 lg:left-14 bg-zinc-50 dark:bg-zinc-300 rounded-full'></div>
            </div>
          </div>
          <div className='w-full flex justify-end pt-2'>
            <div className='w-64 flex flex-col items-end font-light font-manrope break-all text-right'>
              {userData ? (
                <span className='text-2xl font-semibold line-clamp-2 hover:line-clamp-none text-zinc-800 dark:text-zinc-300'>
                  {userData!?.name}
                </span>
              ) : (
                <Skeleton className='w-52 h-10 bg-zinc-300 dark:bg-zinc-700' />
              )}

              {userData ? <Followers /> : <Skeleton className='w-36 h-6 bg-zinc-300 dark:bg-zinc-700' />}
              {userData ? (
                <MemberSince date={userData!?.createdAt} />
              ) : (
                <Skeleton className='w-24 h-6 bg-zinc-300 dark:bg-zinc-700' />
              )}
              {userData ? (
                <Nationality country={userData!?.country} />
              ) : (
                <Skeleton className='w-36 h-6 bg-zinc-300 dark:bg-zinc-700' />
              )}
              {userData && user!?.uid === id && <EditProfileButton uid={userData!?.uid} />}
              {userData && user!?.uid !== id && <FollowButton uid={userData!?.uid} />}
            </div>
          </div>
        </div>
        {!notFound ? (
          <ProfilePosts
            posts={posts}
            uid={userData!?.uid}
            profileImageUrl={userData!?.profileImageUrl}
            name={userData!?.name}
            processed={processed}
            processing={processing}
          />
        ) : (
          <span className='text-2xl font-thin'> This user does not exist</span>
        )}
      </div>
    </div>
  );
}
