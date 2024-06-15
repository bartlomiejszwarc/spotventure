import PostReplySkeleton from './post-reply-skeleton';

export default function PostRepliesSkeleton() {
  return (
    <div className='p-3 flex flex-col space-y-4'>
      {Array.from({length: 3}).map((_, idx) => (
        <PostReplySkeleton key={idx} />
      ))}
    </div>
  );
}
