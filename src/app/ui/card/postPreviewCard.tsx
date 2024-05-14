import Image from 'next/image';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function PostPreviewCard() {
  return (
    <div className='w-96 h-[20rem] border-0 rounded-xl border-zinc-400 relative bg-zinc-100'>
      <div className='h-[70%] relative'>
        <div className='absolute inset-0'>
          <Image
            className='rounded-t-xl'
            layout='fill'
            objectFit='cover'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/PanoStanislasCrepuscule.jpg/998px-PanoStanislasCrepuscule.jpg'
            alt='Place'
          />
        </div>
        <div className='absolute right-1/2 translate-x-1/2 bottom-0 translate-y-[50%]'>
          <div>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div className='absolute flex w-full justify-between px-3 text-xs pt-1 text-zinc-700'>
        <div className='flex space-x-1 items-center'>
          <AccessTimeIcon className='text-lg' />
          <span>DD/MM/YY</span>
        </div>
        <div className='flex space-x-1 items-center max-w-[100px] '>
          <PlaceIcon className='text-lg' />
          <span className='truncate'>Location</span>
        </div>
      </div>
      <div className='flex flex-col w-full items-center pt-6 overflow-hidden'>
        <span className='text-zinc-800 font-[500] max-w-52 truncate'>@username</span>
        <div className='flex space-x-1 items-center'>
          <FavoriteIcon className='text-lg text-rose-700' />
          <span>#</span>
        </div>
      </div>
    </div>
  );
}

export default PostPreviewCard;
