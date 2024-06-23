'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {Suspense} from 'react';

type OrderByType = 'likesCount';
export default function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const handleOnValueChange = (value: string) => {
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
      <Select onValueChange={handleOnValueChange} defaultValue='popularity'>
        <SelectTrigger className='w-full xs:w-64 outline-none bg-zinc-100 dark:bg-zinc-700'>
          <SelectValue placeholder='Sort' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='popularity'>Popularity</SelectItem>
          <SelectItem value='createdAtDesc'>Newest first</SelectItem>
          <SelectItem value='createdAtAsc'>Oldest first</SelectItem>
        </SelectContent>
      </Select>
    </Suspense>
  );
}
