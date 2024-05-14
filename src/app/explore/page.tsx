import PostPreviewCard from '@/components/ui/card/postPreviewCard';
export default function Page() {
  return (
    <div className='w-full flex flex-wrap gap-4 justify-center md:justify-start '>
      <PostPreviewCard />
      <PostPreviewCard />
      <PostPreviewCard />
      <PostPreviewCard />
    </div>
  );
}
