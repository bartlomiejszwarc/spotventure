'use client';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import CountriesList from './countries-list';
import Label from './label';
import {IUser} from '@/interfaces/user-interface';
interface Props {
  onDetailsChange: any;
  user: IUser;
}
export default function ChangeDetailsInputs({onDetailsChange, user}: Props) {
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
        <Label text={'E-mail'} disabled={true} />
        <Input
          className='bg-zinc-50 dark:bg-zinc-900/20 border-zinc-300 dark:border-zinc-700 outline-none'
          disabled
          defaultValue={user!?.email ? user!?.email : ''}
          onChange={(e) => handleNameInputChange(e.target.value)}
        />
      </div>
      <div className='w-full sm:w-96 flex flex-col space-y-1'>
        <Label text={'Name'} disabled={false} />
        <Input
          className='bg-zinc-50 dark:bg-zinc-900/20 border-zinc-300 dark:border-zinc-700 outline-none'
          defaultValue={user!?.name ? user.name : ''}
          onChange={(e) => handleNameInputChange(e.target.value)}
        />
      </div>
      <div className='w-full sm:w-96 flex flex-col space-y-1'>
        <Label text={'Country'} disabled={false} />
        <CountriesList onChange={handleCountryChange} />
      </div>
    </>
  );
}
