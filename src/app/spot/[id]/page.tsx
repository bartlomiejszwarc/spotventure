'use client';
import Image from 'next/image';
import {useGetPostData} from '@/hooks/post/useGetPostData';
import {IPost} from '@/interfaces/postInterface';
import {useEffect, useState} from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import {formatDate} from 'date-fns';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import PostDescription from '@/components/ui/post/post-description';
import PostUserInfo from '@/components/ui/post/post-user-info';
import {useUserData} from '@/hooks/user/useUserData';
import {IUser} from '@/database/actions/userAction';
import PostActions from '@/components/ui/post/post-actions';
import {useUserContext} from '@/hooks/context/useUserContext';

export default function Page({params}: {params: {id: string}}) {
  const {getPostData} = useGetPostData();
  const {getUserData} = useUserData();
  const [post, setPost] = useState<IPost | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const {user: currentUser} = useUserContext();
  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const res = await getPostData(params.id);
        setPost(res);
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
          <div className='absolute bottom-0 w-full'>
            <PostActions
              uid={currentUser!.uid}
              id={post.id as string}
              likedByIds={post.likedByIds}
              profileImageUrl={currentUser?.profileImageUrl}
              name={currentUser?.name as string}
            />
          </div>
        </div>
      </div>
    );
  }
}
