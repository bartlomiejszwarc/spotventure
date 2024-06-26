/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import ResultsPosts from '@/components/explore/results-posts';
import ResultsUsers from '@/components/explore/results-users';
import SearchBar from '@/components/ui/searchbar';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useSearchByKeyword} from '@/hooks/search/useSearchByKeyword';
import {IPost} from '@/interfaces/post-interface';
import {IUser} from '@/interfaces/user-interface';
import {useSearchParams} from 'next/navigation';

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Suspense, useEffect, useState} from 'react';
import Sort from '@/components/explore/sort';

export default function SearchPage() {
  const {searchPostsByKeyword, searchUsersByKeyword} = useSearchByKeyword();
  const [tab, setActiveTab] = useState('spots');

  const [posts, setPosts] = useState<IPost[] | null>([]);
  const [users, setUsers] = useState<IUser[] | null>([]);

  const [processed, setProcessed] = useState<boolean>(false);
  const {user} = useUserContext();

  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const orderBy = searchParams.get('orderBy');
  const order = searchParams.get('order');

  useEffect(() => {
    if (search) {
      const handleSearch = async () => {
        try {
          if (search.length < 1) return;
          setProcessed(false);

          const resPosts = await searchPostsByKeyword(search, orderBy ? orderBy : 'createdAt', order ? order : 'desc');
          setPosts(resPosts);
          const resUsers = await searchUsersByKeyword(search);
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
      handleSearch();
    }
  }, [search, orderBy, order]);

  return (
    <Suspense>
      <div className='w-full flex justify-center pt-6'>
        <div className='w-full flex flex-col space-y-6'>
          <SearchBar />

          <div className='w-full min-h-screen flex flex-wrap gap-4 justify-center md:justify-start'>
            <Tabs defaultValue='spots' className='w-full' value={tab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value='spots'>Spots</TabsTrigger>
                <TabsTrigger value='people'>People</TabsTrigger>
              </TabsList>
              {tab === 'spots' && (
                <div className='py-4'>
                  <Sort />
                </div>
              )}
              <TabsContent value='spots' forceMount={true} hidden={'spots' !== tab}>
                <ResultsPosts posts={posts} processed={processed} />
              </TabsContent>
              <TabsContent value='people' forceMount={true} hidden={'people' !== tab}>
                <ResultsUsers users={users} processed={processed} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
