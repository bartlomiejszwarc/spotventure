import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect} from 'react';

export interface ISidenavField {
  icon: React.ReactElement;
  title: string;
  route: string;
  iconOnly: boolean;
}

function SidenavField({icon, title, route, iconOnly}: ISidenavField) {
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
          className={`${isRouteActive() ? 'text-emerald-500' : 'text-zinc-500'} ${
            isRouteActive() ? 'bg-zinc-700' : 'bg-zinc-700'
          } bg-opacity-20 p-2 rounded-md`}>
          {icon}
        </span>
        {!iconOnly ? (
          <span
            className={`${isRouteActive() ? 'text-emerald-400' : 'text-zinc-500'} text-lg font-[400] tracking-wider`}>
            {title}
          </span>
        ) : null}
      </Link>
    </div>
  );
}
export default SidenavField;
