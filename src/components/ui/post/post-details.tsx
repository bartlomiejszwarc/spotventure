'use client';
import Image from 'next/image';
import {formatDate} from 'date-fns';
import PostActions from './post-actions';
import PostDescription from './post-description';
import PostReplies from './post-replies';
import PostUserInfo from './post-user-info';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useGetPostData} from '@/hooks/post/useGetPostData';
import {useReply} from '@/hooks/reply/useReply';
import {useUserData} from '@/hooks/user/useUserData';
import {IPost} from '@/interfaces/post-interface';
import {IReply} from '@/interfaces/reply-interface';
import {IUser} from '@/interfaces/user-interface';
import {useState, useEffect} from 'react';

interface Props {
  id: string;
}
export default function PostDetails({id}: Props) {
  const {getPostData} = useGetPostData();
  const {getUserData} = useUserData();
  const [post, setPost] = useState<IPost | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [replies, setReplies] = useState<IReply[] | []>([]);
  const {user: currentUser} = useUserContext();

  const {getReplies} = useReply();

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const res = await getPostData(id);
        const replies = await getReplies(id);
        setPost(res);
        setReplies(replies);
      } catch (error) {}
    };
    getPostDetails();
  }, [id]);

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
  if (post && user && currentUser) {
    return (
      <>
        <div className='relative h-[50rem] w-full md:w-[40rem] md:border-[1px]  border-zinc-300 flex items-center justify-center bg-zinc-100 shadow-md'>
          <Image fill={true} src={post.imageUrl} alt={'Spot image'} className='object-contain' />
        </div>
        <div className=' relative w-full h-[35rem] mdplus:h-[50rem] md:w-[40rem] mdplus:w-[25rem] md:border-[1px] border-l-0 border-zinc-300 flex flex-col shadow-md bg-zinc-100 '>
          <div>
            <PostUserInfo uid={post.uid} name={user!.name} profilePictureUrl={user?.profileImageUrl} />
            <PostDescription
              post={post}
              name={user!.name}
              description={post.description}
              location={post.location}
              date={formatDate(post.visitDate as Date, 'LLLL dd yyyy')}
            />
          </div>
          <PostReplies postReplies={replies} />

          <div className='w-full bg-zinc-100'>
            <PostActions
              postAuthorId={post.uid}
              uid={currentUser!.uid}
              id={post.id as string}
              likedByIds={post.likedByIds}
              profileImageUrl={currentUser?.profileImageUrl}
              name={currentUser?.name as string}
              createdAt={post.createdAt as Date}
            />
          </div>
        </div>
      </>
    );
  }
}