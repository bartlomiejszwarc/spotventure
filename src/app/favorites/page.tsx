import FavoritesList from '@/components/favorites/favorites-list';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function Page() {
  return (
    <div className='pt-16 md:pt-6 md:pl-6'>
      <div className='flex space-x-2 items-center text-2xl'>
        <FavoriteIcon
          className='text-rose-600 dark:text-rose-600  w-10 h-10 p-1 rounded-lg'
          style={{fontSize: '1.953rem'}}
        />
        <span className='text-xl font-medium tracking-wide text-zinc-700 dark:text-zinc-300'>Favorites</span>
      </div>
      <FavoritesList />
    </div>
  );
}
