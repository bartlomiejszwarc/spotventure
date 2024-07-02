'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {Suspense, useEffect, useState} from 'react';

type OrderByType = 'likesCount';
export default function Sort() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [orderValue, setOrderValue] = useState<string>('');
  useEffect(() => {
    if (params.get('orderBy') === 'createdAt') {
      if (params.get('order') === 'asc') {
        setOrderValue('createdAtAsc');
      }
      if (params.get('order') === 'desc') {
        setOrderValue('createdAtDesc');
      }
    }
    if (params.get('orderBy') === 'popularity') {
      setOrderValue('popularity');
    }
  }, [params]);
  const pathname = usePathname();
  const {replace} = useRouter();
  const router = useRouter();
  const handleOnValueChange = (value: string) => {
    router.refresh();
    const params = new URLSearchParams(searchParams);
    switch (value) {
      case 'popularity':
        params.set('orderBy', 'popularity');
        params.set('order', 'desc');
        replace(`${pathname}?${params.toString()}`);
        break;
      case 'createdAtDesc':
        params.set('orderBy', 'createdAt');
        params.set('order', 'desc');
        replace(`${pathname}?${params.toString()}`);
        break;
      case 'createdAtAsc':
        params.set('orderBy', 'createdAt');
        params.set('order', 'asc');
        replace(`${pathname}?${params.toString()}`);
        break;
      default:
        params.set('orderBy', 'popularity');
        params.set('order', 'desc');
        replace(`${pathname}?${params.toString()}`);
        break;
    }
  };
  return (
    <Suspense>
      <Select onValueChange={handleOnValueChange} defaultValue={orderValue}>
        <SelectTrigger className='w-full xs:w-64 outline-none bg-zinc-100 dark:bg-zinc-700'>
          <SelectValue placeholder='Sort' />
        </SelectTrigger>
        <SelectContent ref={(ref) => ref?.addEventListener('touchend', (e) => e.preventDefault())}>
          <SelectItem value='popularity'>Popularity</SelectItem>
          <SelectItem value='createdAtAsc'>Newest first</SelectItem>
          <SelectItem value='createdAtDesc'>Oldest first</SelectItem>
        </SelectContent>
      </Select>
    </Suspense>
  );
}
