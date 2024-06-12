/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import {countries} from 'country-flags-svg';
import Image from 'next/image';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useUserContext} from '@/hooks/context/useUserContext';

interface Props {
  onChange: any;
}
export default function CountriesList({onChange}: Props) {
  const {user} = useUserContext();
  return (
    <Select onValueChange={(e) => onChange(e)} defaultValue={user!?.country ? user!?.country : ''}>
      <SelectTrigger className='w-full sm:w-96 outline-none dark:bg-zinc-900/20 border-[1px] border-zinc-300 dark:border-zinc-700 '>
        <SelectValue placeholder='Select country' />
      </SelectTrigger>
      <SelectContent className=''>
        {countries.map((country, idx) => (
          <SelectItem key={idx} value={country.name}>
            <div className='flex space-x-2 w-full items-center h-6 '>
              <Image width={24} height={24} alt={country.name} src={country.flag} />
              <span>{country.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
