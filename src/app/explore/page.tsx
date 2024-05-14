import PostPreviewCard from '@/components/ui/card/postPreviewCard';
import SearchBar from '@/components/ui/searchbar';
export default function Page() {
  return (
    <div className='flex flex-col space-y-6'>
      <SearchBar />
      <div className='w-full flex flex-wrap gap-4 justify-center md:justify-start '>
        <PostPreviewCard />
        <PostPreviewCard />
        <PostPreviewCard />
        <PostPreviewCard />
      </div>
    </div>
  );
}
