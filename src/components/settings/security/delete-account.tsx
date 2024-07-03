'use client';
import {useUserContext} from '@/hooks/context/useUserContext';
import SectionText from './section-text';
import useDeleteUserData from '@/hooks/user/settings/useDeleteUserData';
import useDeleteUserFilesFromStorage from '@/hooks/storage/useDeleteUserFilesFromStorage';
import {EmailAuthProvider, reauthenticateWithCredential, getAuth, deleteUser} from 'firebase/auth';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import DeleteAccountDialog from './delete-account-dialog';

export default function DeleteAccount() {
  const router = useRouter();
  const {user} = useUserContext();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const {deleteUserFilesFromStorage} = useDeleteUserFilesFromStorage();
  const {deleteUserData} = useDeleteUserData();
  const [userPassword, setUserPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const deleteAccount = async () => {
    if (user && currentUser) {
      try {
        await deleteUserFilesFromStorage(user.uid);
        await deleteUserData(user.uid);
        if (!user) throw new Error('No current user found');
        if (!userPassword) throw new Error('Password is required');
        const credential = EmailAuthProvider.credential(currentUser.email as string, userPassword);
        const reauth = await reauthenticateWithCredential(currentUser, credential);
        if (!reauth) throw new Error('Cannot reauthenticate user with provided credentials');
        await deleteUser(currentUser);
        router.push('/signin');
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <div className='flex flex-col w-full sm:w-96'>
      <SectionText text={'Delete account'} />
      <span className='text-sm text-zinc-700 dark:text-zinc-300 dark:font-light'>
        If you no longer wish to use Spotventure, you can pernamently delete your account and all related data.
      </span>
      <div className='mt-6 flex w-full'>
        <DeleteAccountDialog />
      </div>
    </div>
  );
}
