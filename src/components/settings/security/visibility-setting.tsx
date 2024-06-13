'use client';
import {Switch} from '@/components/ui/switch';
import {useUserContext} from '@/hooks/context/useUserContext';
import useUpdateProfile from '@/hooks/user/settings/useUpdateProfile';
import {IUser, IUserProfileUpdate} from '@/interfaces/user-interface';
import LockIcon from '@mui/icons-material/Lock';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {useState} from 'react';

export default function VisibilitySetting() {
  const {user, dispatch} = useUserContext();
  const {updateProfile} = useUpdateProfile();

  const [postsVisible, setPostsVisible] = useState<boolean | undefined>(user?.postsVisible);

  const changePostsVisibility = async (value: boolean) => {
    try {
      if (user) {
        const body: IUserProfileUpdate = {
          postsVisible: value,
        };
        const res = await updateProfile(user?.uid, body);
        const userUpdated: Partial<IUser> = {
          ...res,
        };
        dispatch({type: 'SET_USER_DATA', payload: {...user, ...userUpdated}});
      }
    } catch (error) {}
  };
  return (
    <div className='flex flex-col space-y-1'>
      <div className='w-full md:w-96 flex justify-between'>
        <div className='flex space-x-1 items-center text-zinc-700 dark:text-zinc-400'>
          {!postsVisible ? <LockIcon /> : <TravelExploreIcon />}
          <span className='tracking-wide'>Posts visibility</span>
        </div>
        <Switch
          onCheckedChange={(value) => {
            setPostsVisible(value);
            changePostsVisibility(value);
          }}
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
