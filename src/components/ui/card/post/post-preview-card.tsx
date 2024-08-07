/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useState, useEffect} from 'react';
import {useUserData} from '@/hooks/user/useUserData';
import UserAvatar from '../../user-avatar';
import PostLikes from './post-likes';
import UsernameLink from './username-link';
import convertDate from '@/utils/convert-date';
import {useRouter} from 'next/navigation';
import {Skeleton} from '@/components/ui/skeleton';

interface IPostPreview {
  id: string | undefined;
  uid: string;
  imageUrl: string;
  location: string;
  visitDate: Date | undefined;
  likesCount: number;
  likedByIds: string[];
  profileImageUrl?: string | undefined;
  username?: string;
}

function PostPreviewCard({
  id,
  uid,
  imageUrl,
  location,
  visitDate,
  likesCount,
  likedByIds,
  profileImageUrl,
  username,
}: IPostPreview) {
  const [name, setName] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [userProfileImageUrl, setUserProfileImageUrl] = useState<string | null>();
  const router = useRouter();
  const {getUserData} = useUserData();

  useEffect(() => {
    const getUserDataFromUid = async () => {
      if (uid) {
        const res = await getUserData(uid);
        if (res) setName(res.data.user.name);
        if (!profileImageUrl) setUserProfileImageUrl(res?.data.user.profileImageUrl);
      }
    };

    getUserDataFromUid();
  }, [id]);

  if (!id) return null;

  return (
    <div className='relative h-[12rem] lg:h-[17rem]'>
      <div
        className='cursor-pointer h-[12rem] lg:h-[17rem] rounded-xl relative bg-zinc-100 dark:bg-zinc-900 shadow-lg shadow-zinc-300 dark:shadow-zinc-900/80 '
        onClick={() => router.push(`/spot/${id}`)}>
        <div className='h-3/5 lg:h-[70%] relative'>
          <div className='w-full '>
            <Image
              className='rounded-t-xl object-cover'
              fill={true}
              src={imageUrl}
              alt='Place'
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>
          <div className='absolute flex w-full h-full items-end justify-between px-3 pb-1 opacity-80'>
            <div className='flex space-x-1 bg-zinc-600/80 text-zinc-300 pr-[7px] pl-2 rounded-full bg-opacity-60 py-[2px] items-center'>
              <span className='truncate text-xxs md:text-xs xl:text-sm '>
                <time dateTime={visitDate!?.toString()}>{convertDate(visitDate, 'LLLL d, yyyy')}</time>
              </span>
              <AccessTimeIcon className='text-sm lg:text-lg ' />
            </div>
          </div>
          <div className='absolute flex w-full h-full items-start justify-end pt-1 px-3 opacity-90 '>
            <div className='flex space-x-[2px] items-center justify-start pl-[5px] pr-2 text-zinc-300 bg-zinc-600/80 rounded-full max-w-36 backdrop-blur-lg py-[2px]'>
              <PlaceIcon className='text-sm lg:text-lg ' />
              <span className='truncate text-xxs md:text-xs xl:text-sm text-zinc-300'>{location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full absolute top-0 translate-y-[7.2rem] lg:translate-y-[11.9rem] z-20 flex flex-col items-center bg-red-500'>
        <div className='flex flex-col absolute translate-y-[-50%] items-center z-20'>
          <UserAvatar
            profileImageUrl={userProfileImageUrl ? (userProfileImageUrl as string) : profileImageUrl}
            name={name}
            className='w-12 h-12'
          />
        </div>
        <div className='flex flex-col items-center pt-6 overflow-hidden absolute z-30'>
          <UsernameLink uid={uid} name={name} />
          <PostLikes
            id={id as string}
            likedByIds={likedByIds}
            likesCount={likesCount}
            uid={uid}
            likesCountHidden={false}
          />
        </div>
      </div>
    </div>
  );
}

export default PostPreviewCard;
