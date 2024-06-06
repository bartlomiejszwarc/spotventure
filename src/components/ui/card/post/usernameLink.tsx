import Link from 'next/link';

interface Props {
  uid: string;
  name: string;
}
export default function UsernameLink({uid, name}: Props) {
  return (
    <Link href={`/profile/${uid}`} className='text-zinc-800 font-[500] max-w-52 truncate text-sm lg:text-lg'>
      {name}
    </Link>
  );
}
