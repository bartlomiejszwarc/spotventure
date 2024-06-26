import Link from 'next/link';

interface Props {
  uid: string;
  name: string;
  type: string;
  subjectId?: string;
}
export default function NotificationDescription({type, uid, name, subjectId}: Props) {
  if (type === 'like') {
    return (
      <span className='font-manrope text-zinc-800 dark:text-zinc-300'>
        {' '}
        <Link className='font-medium' href={`profile/${uid}`}>
          {name}
        </Link>{' '}
        liked your{' '}
        <Link href={`/spot/${subjectId}`} className='font-medium'>
          spot
        </Link>
        {'.'}
      </span>
    );
  }

  if (type === 'follow') {
    return (
      <span className='font-manrope text-zinc-800 dark:text-zinc-300'>
        {' '}
        <Link className='font-medium' href={`profile/${uid}`}>
          {name}
        </Link>{' '}
        started following you.
      </span>
    );
  }
  if (type === 'reply') {
    return (
      <span className='font-manrope text-zinc-800 dark:text-zinc-300'>
        {' '}
        <Link className='font-medium' href={`profile/${uid}`}>
          {name}
        </Link>{' '}
        replied to your{' '}
        <Link href={`/spot/${subjectId}`} className='font-medium'>
          spot
        </Link>
        {'.'}
      </span>
    );
  }
}
