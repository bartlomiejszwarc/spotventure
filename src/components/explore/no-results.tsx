import NothingFoundIcon from '../ui/icons/nothing-found-icon';

interface NoResultsProps {
  type: string;
  keyword: string;
}
export default function NoResults({type, keyword}: NoResultsProps) {
  return (
    <div className='flex flex-col w-full pt-8 lg:pt-16 items-center justify-center space-y-6'>
      <NothingFoundIcon />
      <span className='text-xl font-light'>
        No {type === 'posts' ? 'spots' : 'users'} found for <span className='font-medium'>{keyword}</span>
      </span>
    </div>
  );
}
