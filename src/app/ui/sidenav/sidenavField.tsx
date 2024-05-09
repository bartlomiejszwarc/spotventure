import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect} from 'react';

export interface ISidenavField {
  icon: React.ReactElement;
  title: string;
  route: string;
}
function SidenavField({icon, title, route}: ISidenavField) {
  const pathname = usePathname();
  const router = useRouter();

  const isRouteActive = () => {
    if (pathname?.slice(1, pathname.length).split('/')[0] === title.toLowerCase()) return true;
    else return false;
  };

  return (
    <div className='flex'>
      <Link href={route} className='flex items-center justify-center space-x-3'>
        <span
          className={`${
            isRouteActive() ? 'text-emerald-500' : 'text-zinc-300'
          } bg-zinc-600 bg-opacity-20 p-1 rounded-md`}>
          {icon}
        </span>
        <span className={`${isRouteActive() ? 'text-emerald-500' : 'text-zinc-300'} text-xl`}>{title}</span>
      </Link>
    </div>
  );
}
export default SidenavField;
