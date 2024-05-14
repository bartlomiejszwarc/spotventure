import SearchIcon from '@mui/icons-material/Search';
function SearchBar() {
  return (
    <div className='w-full h-12 rounded-full border-2 border-zinc-300 flex items-center justify-between pr-4 pl-6'>
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
