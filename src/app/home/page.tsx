import PostPreviewCard from '../ui/card/postPreviewCard';
export default function Page() {
  return (
    <>
      <span>From most famous places</span>

      <div className='w-full flex flex-wrap gap-4'>
        <PostPreviewCard />
        <PostPreviewCard />
        <PostPreviewCard />
        <PostPreviewCard />
        <PostPreviewCard />
        <PostPreviewCard />
        <PostPreviewCard />
        <PostPreviewCard />
      </div>
      <span>From Poland</span>

      <div className='w-full flex'>
        <PostPreviewCard />
      </div>
    </>
  );
}
