'use client';
import {findFlagUrlByNationality} from 'country-flags-svg';
import Image from 'next/image';
interface Props {
  country: string | undefined;
}
export default function Nationality({country}: Props) {
  if (country) {
    return <Image width={48} height={48} alt={country} src={findFlagUrlByNationality(country)} />;
  }
}
