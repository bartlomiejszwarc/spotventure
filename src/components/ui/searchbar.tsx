'use client';
import './styles.css';
import {useState, useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const handleSearchOnKeyDown = (event?: React.KeyboardEvent<HTMLInputElement>) => {
    if (event?.key === 'Enter') {
      const params = new URLSearchParams(searchParams);
      if (inputValue) {
        params.set('search', inputValue);
        if (params.get('orderBy') === '' || params.get('orderBy') === null) {
          params.set('orderBy', 'popularity');
          params.set('order', 'desc');
        }
        replace(`${pathname}?${params.toString()}`);
      }
    }
  };
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (inputValue) {
      params.set('search', inputValue);
      if (params.get('orderBy') === '' || params.get('orderBy') === null) {
        params.set('orderBy', 'popularity');
        params.set('order', 'desc');
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div
      className={`w-full lg:w-96 h-12 rounded-full border-2 bg-zinc-100 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-700 flex items-center justify-between pr-4 pl-6  ${
        focused ? 'focused-full-width lg:w-full' : ''
      }`}>
      <input
        defaultValue={searchParams.get('search') ? (searchParams.get('search') as string) : ''}
        onFocus={() => setFocused(true)}
        type='text'
        className='w-full bg-transparent h-[70%] placeholder:text-lg outline-none'
        placeholder='Explore'
        onKeyDown={(e) => handleSearchOnKeyDown(e)}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}></input>
      <button onClick={handleSearch}>
        <SearchIcon className='text-zinc-600 dark:text-zinc-300' />
      </button>
    </div>
  );
}

export default SearchBar;
