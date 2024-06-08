'use client';
import Image from 'next/image';
import {useGetPostData} from '@/hooks/post/useGetPostData';
import {IPost} from '@/interfaces/postInterface';
import {useEffect, useState} from 'react';
import {formatDate} from 'date-fns';
import PostDescription from '@/components/ui/post/post-description';
import PostUserInfo from '@/components/ui/post/post-user-info';
import {useUserData} from '@/hooks/user/useUserData';
import {IUser} from '@/database/actions/userAction';
import PostActions from '@/components/ui/post/post-actions';
import {useUserContext} from '@/hooks/context/useUserContext';
import PostReplies from '@/components/ui/post/post-replies';
import {usePostContext} from '@/hooks/context/usePostContext';
import {useReply} from '@/hooks/reply/useReply';

export default function Page({params}: {params: {id: string}}) {
  const {getPostData} = useGetPostData();
  const {getUserData} = useUserData();
  const [post, setPost] = useState<IPost | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const {user: currentUser} = useUserContext();
  const {dispatch} = usePostContext();
  const {getReplies} = useReply();

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const res = await getPostData(params.id);
        const replies = await getReplies(params.id);
        setPost(res);
        dispatch({type: 'SET_POST_REPLIES', payload: replies});
      } catch (error) {
        console.log(error);
      }
    };
    getPostDetails();
  }, [params.id]);

  useEffect(() => {
    if (post) {
      const getUserDetails = async () => {
        try {
          const res = await getUserData(post.uid);
          setUser(res?.data.user);
        } catch (error) {}
      };
      getUserDetails();
    }
  }, [post]);

  if (post && user) {
    return (
      <div className='w-full flex lg:justify-center lg:items-center min-h-screen h-screen'>
        <div className='relative h-[50rem] w-[40rem] border-[1px]  border-zinc-300 flex items-center justify-center bg-zinc-100 shadow-md'>
          <Image fill={true} src={post.imageUrl} alt={'Spot image'} className='object-contain' />
        </div>
        <div className='relative h-[50rem] w-[25rem] border-[1px] border-l-0 border-zinc-300 bg-zinc-100 flex flex-col shadow-md '>
          <PostUserInfo uid={post.uid} name={user!.name} profilePictureUrl={user?.profileImageUrl} />
          <PostDescription
            post={post}
            name={user!.name}
            description={post.description}
            location={post.location}
            date={formatDate(post.visitDate as Date, 'LLLL dd yyyy')}
          />
          <PostReplies />
          <div className='absolute bottom-0 w-full'>
            <PostActions
              uid={currentUser!.uid}
              id={post.id as string}
              likedByIds={post.likedByIds}
              profileImageUrl={currentUser?.profileImageUrl}
              name={currentUser?.name as string}
              createdAt={post.createdAt as Date}
            />
          </div>
        </div>
      </div>
    );
  }
}
