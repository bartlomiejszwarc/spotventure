import {IUser} from '@/database/actions/userAction';
import UserPreviewCard from '../ui/card/userPreviewCard';
import NoResults from './no-results';

interface Props {
  users: IUser[] | null;
  keyword: string;
  processed: boolean;
}
export default function ResultsUsers({users, keyword, processed}: Props) {
  if (users!.length > 0 && keyword)
    return (
      <div className='pt-8 flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:gap-6 flex-wrap '>
        {users?.map((user, idx) => (
          <UserPreviewCard key={idx} uid={user.uid} name={user.name} profileImageUrl={user.profileImageUrl} />
        ))}
      </div>
    );
  if (users!.length === 0 && keyword && processed) {
    return <NoResults type={'users'} keyword={keyword} />;
  }
}
