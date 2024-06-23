import PostDetailsSkeleton from '@/components/ui/skeletons/post/post-details-skeleton';

export default function Loading() {
  return (
    <>
      <div className='pt-8 flex flex-col space-y-10 w-full items-center'>
        {Array.from({length: 2}).map((_, idx) => (
          <PostDetailsSkeleton key={idx} />
        ))}
      </div>
    </>
  );
}
