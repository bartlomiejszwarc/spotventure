import {ScrollArea} from '@/components/ui/scroll-area';
import PaidIcon from '@mui/icons-material/Paid';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {IPost} from '@/interfaces/postInterface';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import NotAccessibleIcon from '@mui/icons-material/NotAccessible';
import BedtimeOffIcon from '@mui/icons-material/BedtimeOff';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
interface Props {
  name: string;
  description: string;
  location: string;
  date: string;
  post: IPost;
}
export default function PostDescription({name, description, location, date, post}: Props) {
  return (
    <ScrollArea className='p-3 text-sm border-b-[1px] border-zinc-300 flex flex-col' style={{maxHeight: '33%'}}>
      <div className='flex justify-between pb-2'>
        <span>
          {date}
          {', '} {location}
        </span>
        <div className='flex space-x-1 '>
          {post.free ? <MoneyOffIcon className='text-md w-[18px]' /> : <PaidIcon className='text-md w-[18px]' />}
          {post.disabilityFriendly ? (
            <AccessibleIcon className='text-md w-[18px]' />
          ) : (
            <NotAccessibleIcon className='text-md w-[17px]' />
          )}
          {post.anyTimeAvailable ? (
            <AccessTimeIcon className='text-md w-[19px]' />
          ) : (
            <BedtimeOffIcon className='text-md w-[19px]' />
          )}
          {post.parkingAvailable ? (
            <LocalParkingIcon className='text-md w-[19px]' />
          ) : (
            <div className='relative  w-[19px] flex justify-center'>
              <DriveEtaIcon className='text-md absolute w-[12px]' />
              <NotInterestedIcon className='text-md absolute w-[20px]' />
            </div>
          )}
        </div>
      </div>
      <div>
        <span className='font-bold text-md'>{name} </span>
        <span>{description}</span>
      </div>
    </ScrollArea>
  );
}
