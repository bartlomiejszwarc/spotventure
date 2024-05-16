'use client';
import './styles.css';

import React, {useState, useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleOutOfFocus = () => {
    setFocused(false);
  };

  return (
    <div
      className={`w-full lg:w-96 h-12 rounded-full border-2 bg-zinc-100 border-zinc-300 flex items-center justify-between pr-4 pl-6 ${
        focused ? 'focused-full-width lg:w-full' : 'unfocused'
      }`}
      onClick={handleFocus}
      onMouseOut={handleOutOfFocus}>
      <input
        type='text'
        className='w-full bg-transparent h-[70%] placeholder:text-lg outline-none'
        placeholder='Explore'
      />
      <SearchIcon className='text-zinc-600' />
    </div>
  );
}

export default SearchBar;
