'use client';
import {Input} from '@/components/ui/input';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useState} from 'react';
import CountriesList from './countries-list';
interface Props {
  onDetailsChange: any;
}
export default function ChangeDetailsInputs({onDetailsChange}: Props) {
  const {user} = useUserContext();
  const [name, setName] = useState<string>(user!?.name);
  const [country, setCountry] = useState<string>('');

  const handleNameInputChange = (value: string) => {
    setName(value);
    onDetailsChange(value, country);
  };
  const handleCountryChange = (value: string) => {
    setCountry(value);
    onDetailsChange(name, value);
  };
  return (
    <>
      <div className='w-full sm:w-96 flex flex-col space-y-1'>
        <span className='uppercase text-zinc-500 font-semibold dark:text-zinc-500 text-[15px] tracking-wide'>
          E-mail
        </span>
        <Input
          className='bg-zinc-50 dark:bg-zinc-900/20 border-zinc-300 dark:border-zinc-700 outline-none'
          disabled
          defaultValue={user!?.email ? user!?.email : ''}
          onChange={(e) => handleNameInputChange(e.target.value)}
        />
      </div>
      <div className='w-full sm:w-96 flex flex-col space-y-1'>
        <span className='uppercase text-zinc-600 font-semibold dark:text-zinc-400 text-[15px] tracking-wide'>Name</span>
        <Input
          className='bg-zinc-50 dark:bg-zinc-900/20 border-zinc-300 dark:border-zinc-700 outline-none'
          defaultValue={user!?.name ? user.name : ''}
          onChange={(e) => handleNameInputChange(e.target.value)}
        />
      </div>
      <div className='w-full sm:w-96 flex flex-col space-y-1'>
        <span className='uppercase text-zinc-600 font-semibold dark:text-zinc-400 text-[15px] tracking-wide'>
          Country
        </span>
        <CountriesList onChange={handleCountryChange} />
      </div>
    </>
  );
}
