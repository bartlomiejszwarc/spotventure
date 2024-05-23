'use client';
import {useUserContext} from '@/hooks/context/useUserContext';

export default function Page() {
  const {user} = useUserContext();
  return <div className='w-full  flex justify-center'></div>;
}
