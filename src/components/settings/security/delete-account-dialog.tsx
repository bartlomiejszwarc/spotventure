import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
import {useUserContext} from '@/hooks/context/useUserContext';
import useDeleteUserFilesFromStorage from '@/hooks/storage/useDeleteUserFilesFromStorage';
import useDeleteUserData from '@/hooks/user/settings/useDeleteUserData';
import {getAuth, EmailAuthProvider, reauthenticateWithCredential, deleteUser} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import DeleteAccountSvg from './delete-account-svg';
import {Input} from '@/components/ui/input';
import {FirebaseError} from 'firebase/app';

export default function DeleteAccountDialog() {
  const router = useRouter();
  const {user} = useUserContext();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const {deleteUserFilesFromStorage} = useDeleteUserFilesFromStorage();
  const {deleteUserData} = useDeleteUserData();
  const [userPassword, setUserPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const deleteAccount = async () => {
    if (user && currentUser) {
      try {
        if (!user) throw new Error('No current user found');
        if (!userPassword) throw new Error('Password is required');
        const credential = EmailAuthProvider.credential(currentUser.email as string, userPassword);
        if (!credential) throw new Error('Invalid credentials');
        const reauth = await reauthenticateWithCredential(currentUser, credential);
        if (!reauth) throw new Error('Invalid credentials');
        await deleteUser(currentUser);
        await deleteUserFilesFromStorage(user.uid);
        await deleteUserData(user.uid);
        router.push('/signin');
      } catch (error: any) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/too-many-requests') setErrorMessage('Too many requests. Please try again later.');
          if (error.code === 'auth/invalid-credential') setErrorMessage('Invalid credentials.');
        } else {
          setErrorMessage(error.message);
        }
      }
    }
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className='w-full'>
        <button className='w-full bg-red-700 dark:bg-red-800 text-zinc-200 py-2 rounded-lg'>Delete my account</button>
      </DialogTrigger>
      <DialogContent className='pt-12'>
        {step === 0 && (
          <div className='w-full flex flex-col items-center justify-center h-64 font-manrope text-zinc-700 dark:text-zinc-300 px-10 md:px-8 space-y-5'>
            <DeleteAccountSvg />
            <span className='text-xs md:text-base text-center leading-8'>
              Are you sure you want to delete your account? <br />
              This process is irreversible. All your data will be gone <span className='font-bold'>forever</span>.
            </span>
            <div className='flex w-full space-x-2 font-light'>
              <button
                className='w-full border-[1px] border-zinc-400 dark:border-zinc-800 font-medium py-[0.35rem] rounded-sm'
                onClick={() => {
                  setDialogOpen(false);
                  setErrorMessage('');
                  window.setTimeout(() => {
                    setStep(0);
                  }, 100);
                }}>
                Cancel
              </button>
              <button
                className='w-full bg-red-800 py-[0.35rem] rounded-sm font-medium text-zinc-200'
                onClick={() => setStep(1)}>
                Confirm
              </button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className='w-full flex flex-col items-center justify-center h-64 font-manrope text-zinc-700 dark:text-zinc-300 px-4 md:px-8 space-y-5'>
            <DeleteAccountSvg />

            <div className='w-full flex flex-col space-y-1'>
              <span className='text-xs md:text-base text-center leading-8'>Please enter your password</span>
              <Input
                className='outline-none'
                type='password'
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />

              <div className='h-4 w-full flex'>
                {errorMessage!?.length > 0 && <span className='text-xs md:text-sm text-red-600'>{errorMessage}</span>}
              </div>
            </div>

            <div className='flex w-full space-x-2 font-light'>
              <button
                className='w-full border-[1px] border-zinc-400 dark:border-zinc-800  font-medium py-[0.35rem] rounded-sm text-xs md:text-base'
                onClick={() => {
                  setDialogOpen(false);
                  setErrorMessage('');
                  window.setTimeout(() => {
                    setStep(0);
                  }, 100);
                }}>
                Cancel
              </button>
              <button
                className='w-full bg-red-800 py-[0.35rem] rounded-sm font-medium text-zinc-200 text-xs md:text-base'
                onClick={deleteAccount}>
                Delete my account
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
