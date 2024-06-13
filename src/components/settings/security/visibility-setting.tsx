'use client';
import {Switch} from '@/components/ui/switch';
import {useUserContext} from '@/hooks/context/useUserContext';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import {useState} from 'react';
export default function VisibilitySetting() {
  const {user} = useUserContext();
  const [postsVisible, setPostsVisible] = useState<boolean | undefined>(user?.postsVisible);
  return (
    <div className='flex flex-col space-y-1'>
      <div className='w-full md:w-96 flex justify-between'>
        <div className='flex space-x-1 items-center text-zinc-700 dark:text-zinc-400'>
          {!postsVisible ? <LockIcon /> : <NoEncryptionGmailerrorredIcon />}
          <span className='tracking-wide'>Posts visibility</span>
        </div>
        <Switch
          onCheckedChange={setPostsVisible}
          className='data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-700'
          checked={postsVisible}
        />
      </div>
      <span className='text-xs text-zinc-700 dark:text-zinc-500 pl-7 max-w-[17rem]'>
        If you disable this option, your posts <br /> <span className='font-bold'>will not</span> be visible to other
        users in search results and on your profile.
      </span>
    </div>
  );
}
