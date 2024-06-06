'use client';
import SearchBar from '@/components/ui/searchbar';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useEffect, useState} from 'react';
import {useSearchByKeyword} from '@/hooks/search/useSearchByKeyword';
import {IPost} from '@/interfaces/postInterface';
import {IUser} from '@/database/actions/userAction';
import {useUserContext} from '@/hooks/context/useUserContext';
import ResultsUsers from '@/components/explore/results-users';
import ResultsPosts from '@/components/explore/results-posts';

export default function Page() {
  const {searchPostsByKeyword, searchUsersByKeyword} = useSearchByKeyword();
  const [posts, setPosts] = useState<IPost[] | null>([]);
  const [users, setUsers] = useState<IUser[] | null>([]);
  const [searchKeyword, setSearchKeyword] = useState<string | null>();
  const [processed, setProcessed] = useState<boolean>(false);
  const {user} = useUserContext();

  const handleOnSearch = async (keyword: string) => {
    try {
      if (keyword.length < 1) return;
      setProcessed(false);
      setSearchKeyword(keyword);
      const resPosts = await searchPostsByKeyword(keyword);
      setPosts(resPosts);
      const resUsers = await searchUsersByKeyword(keyword);
      const resUsersUpdated = resUsers.filter((userObj: {uid: string}) => {
        return userObj.uid !== user!.uid;
      });
      setUsers(resUsersUpdated);
      setUsers(resUsers);
      setProcessed(true);
    } catch (error) {
      setProcessed(true);
    }
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='w-11/12 sm:w-full flex flex-col space-y-6'>
        <SearchBar onSearch={handleOnSearch} />
        <div className='w-full min-h-screen flex flex-wrap gap-4 justify-center md:justify-start'>
          <Tabs defaultValue='spots' className='w-full'>
            <TabsList>
              <TabsTrigger value='spots'>Spots</TabsTrigger>
              <TabsTrigger value='people'>People</TabsTrigger>
            </TabsList>
            <TabsContent value='spots'>
              <ResultsPosts posts={posts} keyword={searchKeyword as string} processed={processed} />
            </TabsContent>
            <TabsContent value='people'>
              <ResultsUsers users={users} keyword={searchKeyword as string} processed={processed} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
