import {ScrollArea} from '@/components/ui/scroll-area';
import PaidIcon from '@mui/icons-material/Paid';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {IPost} from '@/interfaces/post-interface';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import NotAccessibleIcon from '@mui/icons-material/NotAccessible';
import BedtimeOffIcon from '@mui/icons-material/BedtimeOff';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import {Skeleton} from '../skeleton';
interface Props {
  name: string;
  description: string;
  location: string;
  date: string | undefined;
  post: IPost | null;
}
export default function PostDescription({name, description, location, date, post}: Props) {
  return (
    <ScrollArea
      className='p-3 text-sm border-b-[1px] border-zinc-300 dark:border-zinc-700 flex flex-col text-zinc-800 dark:text-zinc-300'
      style={{maxHeight: '150px'}}>
      {post ? (
        <div className='flex justify-between pb-2 font-light'>
          <span>
            {date}
            {', '} {location}
          </span>
          <div className='flex space-x-1 '>
            {post?.free ? <MoneyOffIcon className='text-md w-[18px]' /> : <PaidIcon className='text-md w-[18px]' />}
            {post?.disabilityFriendly ? (
              <AccessibleIcon className='text-md w-[18px]' />
            ) : (
              <NotAccessibleIcon className='text-md w-[17px]' />
            )}
            {post?.anyTimeAvailable ? (
              <AccessTimeIcon className='text-md w-[19px]' />
            ) : (
              <BedtimeOffIcon className='text-md w-[19px]' />
            )}
            {post?.parkingAvailable ? (
              <LocalParkingIcon className='text-md w-[19px]' />
            ) : (
              <div className='relative w-[19px] flex justify-center items-center '>
                <DriveEtaIcon className='text-md absolute w-[10px]' sx={{fontSize: '15px'}} />
                <NotInterestedIcon className='text-md absolute w-[20px]' />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Skeleton className='w-64 h-5 mb-2' />
      )}

      <div className='block'>
        {post ? <span className='font-bold text-md pr-[2px]'>{name} </span> : <Skeleton className='w-24 h-5' />}
        {post ? <span>{description}</span> : <Skeleton className='w-36 h-5' />}
      </div>
    </ScrollArea>
  );
}
