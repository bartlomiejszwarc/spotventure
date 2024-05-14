import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

export interface INotification {
  id: string;
  text: string;
  fromUserId: string;
  date: Date;
  notificationSubjectId: string;
}

const getUserDetails = () => {};

function Notification() {
  return (
    <>
      <div className='w-full h-24 flex flex-row items-center px-6 space-x-4 bg-zinc-100 rounded-sm'>
        <Avatar className='w-14 h-14'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col w-full'>
          <div className='w-full flex justify-between'>
            <span className='font-[500] text-zinc-700'>@username</span>
            <span className='text-sm text-zinc-500'>Date</span>
          </div>
          <div>
            <span className='text-sm tracking-wide'>notification text</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Notification;
