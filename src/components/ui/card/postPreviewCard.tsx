import Image from 'next/image';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {IPost} from './../../../interfaces/postInterface';
import {parseISO, format} from 'date-fns';

interface IPostPreview {
  uid: string;
  imageUrl: string;
  location: string;
  visitDate: Date | undefined;
  likesCount: number;
  profileImageUrl?: string | undefined;
  username?: string;
}

function PostPreviewCard({uid, imageUrl, location, visitDate, likesCount, profileImageUrl, username}: IPostPreview) {
  return (
    <div className='w-64 h-[12rem] lg:w-80 lg:h-[17rem] border-0 rounded-xl border-zinc-400 relative bg-zinc-100 '>
      <div className='h-1/2 lg:h-[70%] relative'>
        <div className='absolute inset-0'>
          <Image className='rounded-t-xl' layout='fill' objectFit='cover' src={imageUrl} alt='Place' />
        </div>
        <div className='absolute right-1/2 translate-x-1/2 bottom-0 translate-y-[50%]'>
          <div>
            <Avatar>
              {profileImageUrl ? (
                <AvatarImage src={profileImageUrl} />
              ) : (
                <AvatarImage src='https://github.com/shadcn.png' />
              )}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className='absolute flex w-full justify-between px-3 pt-1 text-zinc-700'>
        <div className='flex space-x-1 items-center'>
          <AccessTimeIcon className='text-sm lg:text-lg' />
          <span className='truncate text-xxs md:text-xs xl:text-sm'>
            {/* <time dateTime={visitDate!?.toString()}>{format(visitDate!?.toString(), 'LLLL d, yyyy')}</time> */}
          </span>
        </div>
        <div className='flex space-x-1 items-center max-w-[75px] lg:max-w-[110px] '>
          <PlaceIcon className='text-sm lg:text-lg' />
          <span className='truncate text-xxs md:text-xs xl:text-sm'>{location}</span>
        </div>
      </div>
      <div className='flex flex-col w-full items-center pt-6 overflow-hidden'>
        <span className='text-zinc-800 font-[500] max-w-52 truncate text-sm lg:text-lg'>{username}</span>
        <div className='flex space-x-1 items-center'>
          <FavoriteIcon className='text-lg text-rose-600' />
          <span>{likesCount}</span>
        </div>
      </div>
    </div>
  );
}

export default PostPreviewCard;
