'use client';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import SectionText from './section-text';

export default function ChangePassword() {
  const {toast} = useToast();

  const handlePasswordInputChange = (value: string) => {};

  const changePassword = () => {
    toast({
      description: 'Your password has been changed',
    });
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
            onChange={(e) => handlePasswordInputChange(e.target.value)}
          />
        </div>
        <div className='w-full sm:w-96 flex flex-col space-y-1'>
          <span className='uppercase text-zinc-500 font-semibold dark:text-zinc-500 text-[15px] tracking-wide'>
            Repeat password
          </span>
          <Input
            type='password'
            className='bg-zinc-50 dark:bg-zinc-900/20 border-zinc-300 dark:border-zinc-700 outline-none'
            onChange={(e) => handlePasswordInputChange(e.target.value)}
          />
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
