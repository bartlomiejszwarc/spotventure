import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
interface Props {
  profileImageUrl: string | undefined;
  name: string;
}
export default function UserAvatar({profileImageUrl, name}: Props) {
  return (
    <Avatar className='h-24 w-24 lg:h-36 lg:w-36 absolute bottom-0 left-3 lg:left-10 translate-y-[50%] border-[5px] shadow-md border-zinc-50'>
      {profileImageUrl ? (
        <AvatarImage src={profileImageUrl} className='' />
      ) : (
        <AvatarImage src='https://firebasestorage.googleapis.com/v0/b/spotventure-bc5b2.appspot.com/o/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg?alt=media&token=0a71dd9a-00e1-40fd-93c5-f0fc11fa9909' />
      )}
      <AvatarFallback className='text-3xl text-emerald-700 bg-zinc-50'>{name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
}
