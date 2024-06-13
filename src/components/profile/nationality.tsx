'use client';
import {findFlagUrlByCountryName} from 'country-flags-svg';
import Image from 'next/image';
interface Props {
  country: string | undefined;
}
export default function Nationality({country}: Props) {
  if (country) {
    const url = findFlagUrlByCountryName(country);
    return (
      <div className='relative items-center flex space-x-1 h-6'>
        <span>{country}</span>
        <div className='relative w-6 h-[1rem]'>{url && <Image fill={true} alt={country} src={url} />}</div>
      </div>
    );
  }
}
