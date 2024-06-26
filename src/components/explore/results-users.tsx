import {IUser} from '@/interfaces/user-interface';
import UserPreviewCard from '../ui/card/user-preview-card';
import NoResults from './no-results';
import {useSearchParams} from 'next/navigation';

interface Props {
  users: IUser[] | null;
  processed: boolean;
}
export default function ResultsUsers({users, processed}: Props) {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  if (users!.length > 0 && search)
    return (
      <div className='pt-8 flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:gap-6 flex-wrap '>
        {users?.map((user, idx) => (
          <UserPreviewCard key={idx} uid={user.uid} name={user.name} profileImageUrl={user.profileImageUrl} />
        ))}
      </div>
    );
  if (users!.length === 0 && search && processed) {
    return <NoResults type={'users'} keyword={search} />;
  }
}
