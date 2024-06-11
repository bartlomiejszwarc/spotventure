import UserAvatar from '../user-avatar';

interface Props {
  uid: string;
  name: string;
  profilePictureUrl: string | undefined;
}
export default function PostUserInfo({uid, name, profilePictureUrl}: Props) {
  return (
    <div className='p-3 border-b-[1px] border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 hidden md:flex items-center space-x-3'>
      <UserAvatar profileImageUrl={profilePictureUrl} name={name} />
      <span className='text-sm font-medium'>{name}</span>
    </div>
  );
}
