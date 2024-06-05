import {useUserContext} from '@/hooks/context/useUserContext';

interface Props {
  uid: string;
}
export default function EditProfileButton({uid}: Props) {
  const {user} = useUserContext();
  return (
    <>
      {uid === user!?.uid && (
        <button className='px-3 py-1 bg-zinc-300 text-zinc-800 rounded-lg text-sm mt-4'>Edit profile</button>
      )}
    </>
  );
}
