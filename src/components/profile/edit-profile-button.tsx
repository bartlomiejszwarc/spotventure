import {useUserContext} from '@/hooks/context/useUserContext';
import Link from 'next/link';

interface Props {
  uid: string;
}

export default function EditProfileButton({uid}: Props) {
  const {user} = useUserContext();
  return (
    <>
      {uid === user!?.uid && (
        <button className='px-3 py-1 bg-zinc-300 dark:bg-zinc-600 text-zinc-800  dark:text-zinc-300 rounded-lg text-sm mt-4'>
          <Link href='/settings'>Edit profile</Link>
        </button>
      )}
    </>
  );
}
