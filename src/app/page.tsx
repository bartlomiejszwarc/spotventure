import FollowingPostsList from '@/components/ui/home/following-posts-list';

//import {useRouter} from 'next/router';
export default function Home() {
  return (
    <div className='w-full flex justify-center'>
      <FollowingPostsList />
    </div>
  );
}
