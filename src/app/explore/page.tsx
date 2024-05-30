'use client';
import PostPreviewCard from '@/components/ui/card/postPreviewCard';
import SearchBar from '@/components/ui/searchbar';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useState} from 'react';
import {useSearchByKeyword} from '@/hooks/search/useSearchByKeyword';
import {IPost} from '@/interfaces/postInterface';
import {IUser} from '@/database/actions/userAction';
import LayoutPosts from '@/layouts/layoutPosts';
import {memo} from 'react';
export default function Page() {
  const {searchPostsByKeyword, searchUsersByKeyword} = useSearchByKeyword();

  const [posts, setPosts] = useState<IPost[] | null>([]);
  const [users, setUsers] = useState<IUser[] | null>([]);

  const handleOnSearch = async (keyword: string) => {
    const resPosts = await searchPostsByKeyword(keyword);
    setPosts(resPosts);
    const resUsers = await searchUsersByKeyword(keyword);
    setUsers(resUsers);
  };

  const PostsResults = () => {
    return (
      <LayoutPosts>
        {posts?.map((post, idx) => (
          <>
            <PostPreviewCard
              key={idx}
              id={post.id}
              uid={post.uid}
              imageUrl={post.imageUrl}
              location={post.location}
              visitDate={post.visitDate}
              likedByIds={post.likedByIds}
            />
          </>
        ))}
      </LayoutPosts>
    );
  };

  return (
    <div className='w-full flex flex-col space-y-6'>
      <div>
        <SearchBar onSearch={handleOnSearch} />
      </div>
      <div className='w-full min-h-screen flex flex-wrap gap-4 justify-center md:justify-start'>
        <Tabs defaultValue='spots' className='w-full'>
          <TabsList>
            <TabsTrigger value='spots'>Spots</TabsTrigger>
            <TabsTrigger value='people'>People</TabsTrigger>
          </TabsList>
          <TabsContent value='spots'>
            <PostsResults />
          </TabsContent>
          <TabsContent value='people'>People here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
