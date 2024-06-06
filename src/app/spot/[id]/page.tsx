'use client';

import {useGetPostData} from '@/hooks/post/useGetPostData';
import {useEffect} from 'react';

export default function Page({params}: {params: {id: string}}) {
  const {getPostData} = useGetPostData();
  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const res = await getPostData(params.id);
      } catch (error) {}
    };
    getPostDetails();
  }, [params.id]);
  return <div className='w-full px-96'>{params.id}</div>;
}
