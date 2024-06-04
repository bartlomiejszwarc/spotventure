'use client';
import PostPreviewCard from '@/components/ui/card/postPreviewCard';
import SearchBar from '@/components/ui/searchbar';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useState} from 'react';
import {useSearchByKeyword} from '@/hooks/search/useSearchByKeyword';
import {IPost} from '@/interfaces/postInterface';
import {IUser} from '@/database/actions/userAction';
import LayoutPosts from '@/layouts/layoutPosts';
import NothingFoundIcon from '@/components/ui/icons/nothing-found-icon';
import UserPreviewCard from '@/components/ui/card/userPreviewCard';
import {useUserContext} from '@/hooks/context/useUserContext';

export default function Page() {
  const {searchPostsByKeyword, searchUsersByKeyword} = useSearchByKeyword();
  const [posts, setPosts] = useState<IPost[] | null>([]);
  const [users, setUsers] = useState<IUser[] | null>([]);
  const [searchKeyword, setSearchKeyword] = useState<string | null>();
  const [processed, setProcessed] = useState<boolean>(false);
  const {user} = useUserContext();
  const handleOnSearch = async (keyword: string) => {
    try {
      setProcessed(false);
      setSearchKeyword(keyword);
      const resPosts = await searchPostsByKeyword(keyword);
      setPosts(resPosts);
      const resUsers = await searchUsersByKeyword(keyword);
      const resUsersUpdated = resUsers.filter((userObj: {uid: string}) => {
        return userObj.uid !== user!.uid;
      });
      setUsers(resUsersUpdated);
      setProcessed(true);
    } catch (error) {
      setProcessed(true);
    }
  };

  interface NoResultsProps {
    type: string;
  }
  const NoResults = ({type}: NoResultsProps) => {
    return (
      <div className='flex flex-col w-full pt-8 lg:pt-16 items-center justify-center space-y-6'>
        <NothingFoundIcon />
        <span className='text-xl font-light'>
          No {type === 'posts' ? 'spots' : 'users'} found for <span className='font-medium'>{searchKeyword}</span>
        </span>
      </div>
    );
  };

  const PostsResults = () => {
    if (posts!.length > 0 && searchKeyword) {
      return (
        <LayoutPosts>
          {posts?.map((post, idx) => (
            <PostPreviewCard
              key={idx}
              id={post.id}
              uid={post.uid}
              imageUrl={post.imageUrl}
              location={post.location}
              visitDate={post.visitDate}
              likedByIds={post.likedByIds}
            />
          ))}
        </LayoutPosts>
      );
    }
    if (posts!.length === 0 && searchKeyword && processed) {
      return <NoResults type={'posts'} />;
    }
  };

  const UsersResults = () => {
    if (users!.length > 0 && searchKeyword)
      return (
        <div className='pt-8 flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:gap-6 flex-wrap '>
          {users?.map((user, idx) => (
            <UserPreviewCard key={idx} uid={user.uid} name={user.name} profileImageUrl={user.profileImageUrl} />
          ))}
        </div>
      );
    if (users!.length === 0 && searchKeyword && processed) {
      return <NoResults type={'users'} />;
    }
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
          <TabsContent value='people'>
            <UsersResults />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
