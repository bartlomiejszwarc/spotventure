import {Skeleton} from '../skeleton';
import UserAvatar from '../user-avatar';
import Link from 'next/link';
interface Props {
  uid: string;
  name: string;
  profilePictureUrl: string | undefined;
}
export default function PostUserInfo({uid, name, profilePictureUrl}: Props) {
  return (
    <div className='p-3 border-b-[1px] border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 hidden md:flex items-center space-x-3'>
      {profilePictureUrl ? (
        <UserAvatar profileImageUrl={profilePictureUrl} name={name} />
      ) : (
        <Skeleton className='w-10 h-10 rounded-full' />
      )}
      {name ? (
        <Link href={`/profile/${uid}`} className='text-sm font-medium'>
          {name}
        </Link>
      ) : (
        <Skeleton className='w-36 h-5' />
      )}
    </div>
  );
}
