'use client';

import {useUserContext} from '@/hooks/context/useUserContext';
import SectionText from './section-text';

export default function DeleteAccount() {
  const {user} = useUserContext();

  return (
    <div className='flex flex-col w-full sm:w-96'>
      <SectionText text={'Delete account'} />
      <span className='text-sm text-zinc-700 dark:text-zinc-300 dark:font-light'>
        If you no longer wish to use Spotventure, you can pernamently delete your account and all related data.
      </span>
      <div className='mt-6'>
        <button className='w-full bg-red-700 dark:bg-red-800 text-zinc-200 py-2 rounded-lg'>Delete my account</button>
      </div>
    </div>
  );
}
