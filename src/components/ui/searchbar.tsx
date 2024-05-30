'use client';
import './styles.css';
import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
interface Props {
  onSearch: any;
}
function SearchBar({onSearch}: Props) {
  const [inputValue, setInputValue] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div
      className={`w-full lg:w-96 h-12 rounded-full border-2 bg-zinc-100 border-zinc-300 flex items-center justify-between pr-4 pl-6  ${
        focused ? 'focused-full-width lg:w-full' : 'unfocused'
      }`}>
      <input
        onFocus={() => setFocused(true)}
        type='text'
        className='w-full bg-transparent h-[70%] placeholder:text-lg outline-none'
        placeholder='Explore'
        onChange={(e) => {
          setInputValue(e.target.value);
        }}></input>
      <button onClick={handleSearch}>
        <SearchIcon className='text-zinc-600' />
      </button>
    </div>
  );
}

export default SearchBar;
