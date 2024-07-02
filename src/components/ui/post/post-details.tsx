/* eslint-disable react-hooks/exhaustive-deps */
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
import PostDetailsSkeleton from '../skeletons/post/post-details-skeleton';
import convertDate from '@/utils/convert-date';
import {Skeleton} from '../skeleton';

interface Props {
  id: string;
}
export default function PostDetails({id}: Props) {
  const {getPostData} = useGetPostData();
  const {getUserData} = useUserData();
  const [post, setPost] = useState<IPost | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [replies, setReplies] = useState<IReply[] | []>([]);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const {user: currentUser} = useUserContext();

  const {getReplies} = useReply();

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const res = await getPostData(id);
        const replies = await getReplies(id);
        setPost(res);
        setReplies(replies);
        setLoaded(true);
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

  const handleAddReply = (reply: IReply) => {
    setReplies((prev) => [...prev, reply]);
  };
  if (!loaded) {
    return <PostDetailsSkeleton />;
  }
  if (!id) return null;
  return (
    <div className='flex flex-col lg:flex-row '>
      <div className='relative w-[22rem] xs:w-96 h-[15rem] lg:h-[50rem] sm:w-[40rem] sm:border-[1px] sm:border-b-0 lg:border-b-[1px] lg:border-r-0 border-zinc-300 dark:border-zinc-700 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 shadow-md '>
        <Image
          onLoadingComplete={() => setImageLoaded(true)}
          fill={true}
          src={post!?.imageUrl}
          alt={'Spot image'}
          className='object-contain'
        />
      </div>
      <div className=' relative w-[22rem] xs:w-96 h-[35rem] lg:h-[50rem] sm:w-[40rem] lg:w-[25rem] sm:border-[1px] border-l-0 border-zinc-300 dark:border-zinc-700 flex flex-col shadow-md bg-zinc-100 dark:bg-zinc-900 '>
        <div>
          <PostUserInfo uid={post!?.uid} name={user!?.name} profilePictureUrl={user?.profileImageUrl} />
          <PostDescription
            post={post}
            name={user!?.name}
            description={post!?.description}
            location={post!?.location}
            date={convertDate(post!?.visitDate as Date, 'LLLL dd yyyy')}
          />
        </div>
        <PostReplies postReplies={replies} />

        <div className='w-full bg-zinc-100 dark:bg-zinc-900'>
          <PostActions
            postAuthorId={post!?.uid}
            uid={currentUser!?.uid}
            id={post!?.id as string}
            likesCount={post!?.likesCount}
            likedByIds={post!?.likedByIds}
            profileImageUrl={currentUser!?.profileImageUrl}
            name={currentUser?.name as string}
            createdAt={post!?.createdAt as Date}
            onAddReply={handleAddReply}
          />
        </div>
      </div>
    </div>
  );
}
