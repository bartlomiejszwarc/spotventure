'use client';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import SectionText from './section-text';
import {ChangeEventHandler, useState} from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import CheckIcon from '@mui/icons-material/Check';
import {useUpdatePassword} from 'react-firebase-hooks/auth';
import {auth} from '@/firebase/config';
import {useRouter} from 'next/navigation';

export default function ChangePassword() {
  const {toast} = useToast();
  const [updatePassword, error] = useUpdatePassword(auth);
  const router = useRouter();

  const handlePasswordInputChange = (value: string) => {};
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const changePassword = async () => {
    try {
      setErrorMessage('');
      if (password !== repeatPassword) throw Error('Passwords do not match');
      const res = await updatePassword(password);
      if (!res) {
        router.push('/signin');
        toast({
          action: (
            <div className='w-full flex items-center justify-center'>
              <span className='first-letter:capitalize'>Please, sign in again </span>
            </div>
          ),
        });
        return;
      }
      toast({
        action: (
          <div className='w-full flex items-center justify-center'>
            <span className='first-letter:capitalize mr-2'>Password updated </span>
            <CheckIcon className=' text-emerald-500' />
          </div>
        ),
      });
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='flex flex-col space-y-4'>
      <SectionText text={'Change password'} />
      <div className='flex flex-col space-y-5'>
        <div className='w-full sm:w-96 flex flex-col space-y-1'>
          <span className='uppercase text-zinc-500 font-semibold dark:text-zinc-500 text-[15px] tracking-wide'>
            Password
          </span>
          <Input
            type='password'
            className='bg-zinc-50 dark:bg-zinc-900/20 border-zinc-300 dark:border-zinc-700 outline-none'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='w-full sm:w-96 flex flex-col space-y-1'>
          <span className='uppercase text-zinc-500 font-semibold dark:text-zinc-500 text-[15px] tracking-wide'>
            Repeat password
          </span>
          <Input
            type='password'
            className='bg-zinc-50 dark:bg-zinc-900/20 border-zinc-300 dark:border-zinc-700 outline-none'
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          <div className='h-4 flex space-x-1 items-center text-red-600 pt-[2px] pl-[3px]'>
            {errorMessage !== '' && errorMessage !== null && <WarningIcon className='text-sm mt-[1px]' />}
            <span className='text-sm'>{errorMessage}</span>
          </div>
        </div>
      </div>

      <button
        className='w-full sm:w-96 px-8 py-2 bg-emerald-500 dark:bg-emerald-600 text-zinc-100 text-base rounded-lg'
        onClick={changePassword}>
        Change password
      </button>
    </div>
  );
}
