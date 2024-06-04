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
import {useFollowUser} from '@/hooks/user/follow/useFollowUser';
import LayoutPosts from '@/layouts/layoutPosts';
export default function Page({params}: {params: {id: string}}) {
  const {getUserPosts} = useGetUserPosts();
  const {getUserData} = useUserData();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userData, setUserData] = useState<IUser>();
  const [processed, setProcessed] = useState<boolean>(false);

  useEffect(() => {
    setProcessed(false);
    const getPosts = async () => {
      const res = await getUserPosts(params.id);
      if (res) setPosts(res);
    };
    const getUserDetails = async () => {
      const res = await getUserData(params.id);
      if (res) setUserData(res.data.user);
      const followers = res?.data.user.followers;
      setProcessed(true);
    };
    getPosts();
    getUserDetails();
  }, [params.id]);

  const UserAvatar = () => {
    return (
      <Avatar className='h-24 w-24 lg:h-36 lg:w-36 absolute bottom-0 left-3 lg:left-10 translate-y-[50%] border-[5px] shadow-md border-zinc-50'>
        {userData!?.profileImageUrl ? (
          <AvatarImage src={userData!?.profileImageUrl} className='' />
        ) : (
          <AvatarImage src='https://firebasestorage.googleapis.com/v0/b/spotventure-bc5b2.appspot.com/o/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg?alt=media&token=0a71dd9a-00e1-40fd-93c5-f0fc11fa9909' />
        )}
        <AvatarFallback className='text-3xl text-emerald-700 bg-zinc-50'>{userData?.name.slice(0, 1)}</AvatarFallback>
      </Avatar>
    );
  };

  const UserPosts = () => {
    if (posts.length > 0) {
      return (
        <LayoutPosts>
          {posts.map((post, idx) => (
            <PostPreviewCard
              key={idx}
              id={post.id}
              uid={params.id}
              imageUrl={post.imageUrl}
              location={post.location}
              visitDate={post.visitDate}
              likedByIds={post.likedByIds}
              profileImageUrl={userData?.profileImageUrl}
              username={userData?.name}
            />
          ))}
        </LayoutPosts>
      );
    }
    if (posts.length === 0 && processed) {
      return (
        <div>
          <span className='text-2xl font-light'>This user has not add any posts yet</span>
        </div>
      );
    }
  };

  const EditProfileButton = () => {
    const {user} = useUserContext();
    return (
      <>
        {userData?.uid === user!?.uid && (
          <button className='px-3 py-1 bg-zinc-300 text-zinc-800 rounded-lg text-sm mt-4'>Edit profile</button>
        )}
      </>
    );
  };

  const Follows = () => {
    const [followersNumber, setFollowersNumber] = useState<number>(0);

    useEffect(() => {
      setFollowersNumber(userData!?.followers!?.length as number);
    }, [userData]);

    const FollowButton = () => {
      const {user, dispatch} = useUserContext();
      const {followUser, unfollowUser} = useFollowUser();
      const [hover, setHover] = useState<boolean>(false);
      const addToFollowing = async () => {
        dispatch({type: 'ADD_TO_FOLLOWING', payload: userData!?.uid});
        setFollowersNumber((prev) => prev + 1);
        setHover(false);
        if (user!.uid && userData!.uid) await followUser(user!.uid, userData!.uid as string);
      };

      const removeFromFollowing = async () => {
        dispatch({type: 'REMOVE_FROM_FOLLOWING', payload: userData!?.uid});
        setFollowersNumber((prev) => prev - 1);
        if (user!.uid && userData!.uid) await unfollowUser(user!.uid, userData!.uid as string);
      };
      return (
        <>
          {user?.uid !== userData!?.uid && (
            <>
              {!user?.following?.includes(userData!?.uid) ? (
                <button
                  className='py-2 w-28 bg-emerald-500 text-zinc-200 font-medium rounded-full text-base mt-4 border-2 border-transparent'
                  onClick={addToFollowing}>
                  Follow
                </button>
              ) : (
                <button
                  className={`py-2 w-28 ${hover ? 'text-red-400 ' : 'text-emerald-500'} bg-zinc-200 font-medium rounded-full text-base mt-4 border-2 ${hover ? 'border-red-400 ' : 'border-emerald-500'}`}
                  onClick={removeFromFollowing}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}>
                  {hover ? 'Unfollow' : 'Following'}
                </button>
              )}
            </>
          )}
        </>
      );
    };

    return (
      <>
        <div className='flex space-x-3 font-medium'>
          <span>
            {followersNumber + ' '}
            {followersNumber === 1 ? 'follower' : 'followers'}{' '}
          </span>
          <span>{userData?.following?.length} following </span>
        </div>
        <span className='font-light text-xs lg:text-sm'>
          Member since{' '}
          <time dateTime={userData!.createdAt!?.toString()}>
            {format(userData!.createdAt!?.toString(), 'LLLL yyyy')}
          </time>
        </span>
        <FollowButton />
      </>
    );
  };

  if (userData) {
    return (
      <div className='w-full flex justify-center pb-6'>
        <div className='flex flex-col items-center w-full lg:w-3/4 space-y-12 '>
          <div className='w-full'>
            <div className='w-full flex space-x-16'>
              <div className='relative w-full'>
                <img
                  className='w-full bg-zinc-500 h-44 lg:h-72 object-cover shadow-md shadow-zinc-300'
                  src={posts[0]!?.imageUrl}
                />
                <UserAvatar />
              </div>
            </div>
            <div className='w-full flex justify-end pt-2'>
              <div className='w-64 flex flex-col items-end font-light font-manrope break-all text-right'>
                <span className='text-2xl font-semibold line-clamp-2 hover:line-clamp-none'>{userData?.name}</span>
                <Follows />
                <EditProfileButton />
              </div>
            </div>
          </div>

          <UserPosts />
        </div>
      </div>
    );
  }
}
