import Image from 'next/image';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useState, useEffect} from 'react';
import {useUserData} from '@/hooks/user/useUserData';
import UserAvatar from '../../user-avatar';
import PostLikes from './postLikes';
import UsernameLink from './usernameLink';
import convertDate from '@/utils/convertDate';

interface IPostPreview {
  id: string | undefined;
  uid: string;
  imageUrl: string;
  location: string;
  visitDate: Date | undefined;
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
  likedByIds,
  profileImageUrl,
  username,
}: IPostPreview) {
  const [name, setName] = useState<string>('');
  const [userProfileImageUrl, setUserProfileImageUrl] = useState<string | null>();

  const {getUserData} = useUserData();

  useEffect(() => {
    const getUserDataFromUid = async () => {
      const res = await getUserData(uid);
      if (res) setName(res.data.user.name);
      if (!profileImageUrl) setUserProfileImageUrl(res?.data.user.profileImageUrl);
    };

    getUserDataFromUid();
  }, [uid]);

  if (name) {
    return (
      <div className=' h-[12rem] lg:h-[17rem] border-0 rounded-xl border-zinc-400 relative bg-zinc-100 shadow-md shadow-zinc-400 '>
        <div className='h-3/5 lg:h-[70%] relative'>
          <div className='absolute inset-0'>
            <Image className='rounded-t-xl' layout='fill' objectFit='cover' src={imageUrl} alt='Place' />
          </div>
          <div className='absolute flex w-full h-full items-end justify-between px-3 pb-1 opacity-80'>
            <div className='flex space-x-1 bg-zinc-600/80 text-zinc-300 pr-[7px] pl-2 rounded-full bg-opacity-60 py-[2px]'>
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
          <UserAvatar
            profileImageUrl={userProfileImageUrl as string}
            name={name}
            className='lg:h-10 lg:w-10 border-0 absolute right-1/2 translate-x-1/2 bottom-0 translate-y-[50%]'
          />
        </div>

        <div className='flex flex-col w-full items-center pt-6 overflow-hidden'>
          <UsernameLink uid={uid} name={name} />
          <PostLikes id={id as string} likedByIds={likedByIds} uid={uid} />
        </div>
      </div>
    );
  }
}

export default PostPreviewCard;
