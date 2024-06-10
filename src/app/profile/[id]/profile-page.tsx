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
interface Props {
  id: string;
}
export default function ProfilePage({id}: Props) {
  const {getUserPosts} = useGetUserPosts();
  const {dispatch} = useProfileFollowersContext();
  const {getUserData} = useUserData();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userData, setUserData] = useState<IUser>();
  const [processed, setProcessed] = useState<boolean>(false);
  useEffect(() => {
    setProcessed(false);
    const getPosts = async () => {
      const res = await getUserPosts(id);
      if (res) setPosts(res);
    };
    const getUserDetails = async () => {
      const res = await getUserData(id);
      if (res) setUserData(res.data.user);
      const followers = res?.data.user.followers;
      const following = res?.data.user.following;
      dispatch({type: 'SET_PROFILE_FOLLOWERS', payload: {followers: followers, following: following}});
      setProcessed(true);
    };
    getPosts();
    getUserDetails();
  }, [id]);
  if (userData) {
    return (
      <div className='w-full flex justify-center pb-6'>
        <div className='flex flex-col items-center w-full lg:w-3/4 space-y-12 '>
          <div className='w-full'>
            <div className='w-full flex space-x-16'>
              <div className='relative w-full'>
                <div className='w-full h-44 lg:h-72 bg-zinc-500'>
                  <Image
                    quality={100}
                    fill={true}
                    alt='Background'
                    className='w-full bg-zinc-500 h-44 lg:h-72 object-cover shadow-md shadow-zinc-300'
                    src={posts[0]!?.imageUrl}
                  />
                </div>

                <UserAvatar
                  profileImageUrl={userData!.profileImageUrl}
                  name={userData.name}
                  className='h-24 w-24 lg:w-36 lg:h-36 absolute translate-y-[-50%] left-6 lg:left-16 border-zinc-50 border-[5px]'
                />
              </div>
            </div>
            <div className='w-full flex justify-end pt-2'>
              <div className='w-64 flex flex-col items-end font-light font-manrope break-all text-right'>
                <span className='text-2xl font-semibold line-clamp-2 hover:line-clamp-none'>{userData?.name}</span>
                <Followers />
                <MemberSince date={userData!.createdAt} />
                <EditProfileButton uid={userData.uid} />
                <FollowButton uid={userData.uid} />
              </div>
            </div>
          </div>
          <ProfilePosts
            posts={posts}
            uid={userData.uid}
            profileImageUrl={userData.profileImageUrl}
            name={userData.name}
            processed={processed}
          />
        </div>
      </div>
    );
  }
}
