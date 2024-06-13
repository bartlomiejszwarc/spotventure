'use client';
import {useEffect, useState} from 'react';
import './styles.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import SidenavFieldList from './sidenav-field-list';
import {usePathname} from 'next/navigation';
import {UserContextProvider} from '@/context/user-context';

function SideNav() {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [style, setStyle] = useState<string>('');
  const {width} = useWindowDimensions();
  const path = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (width && width > 768) {
      setIsMobile(false);
      setStyle('closed-sidenav-initial');
      setOpen(false);
      setLoading(false);
    } else {
      setIsMobile(true);
      setStyle('closed-sidenav-initial-mobile');
      setOpen(false);
      setLoading(false);
    }
  }, [width]);

  const changeStyle = () => {
    if (open) {
      setStyle('closed-sidenav');
    } else {
      setStyle('open-sidenav');
    }
  };

  if (path !== '/signup' && path !== '/signin' && !loading) {
    return (
      <UserContextProvider>
        <div>
          {!open ? (
            <MenuIcon
              style={{fontSize: '2.441rem'}}
              className={`absolute left-5 top-5  ${
                !isMobile ? 'text-zinc-300 dark:text-zinc-400' : 'text-zinc-800 dark:text-zinc-300'
              }    cursor-pointer`}
              onClick={() => {
                changeStyle();
                setOpen(true);
              }}></MenuIcon>
          ) : (
            <CloseIcon
              style={{fontSize: '2.441rem'}}
              className={` absolute left-5 top-5 text-zinc-300 dark:text-zinc-400  cursor-pointer`}
              onClick={() => {
                changeStyle();
                setOpen(false);
              }}></CloseIcon>
          )}
          {open ? (
            <div className={style}>
              <SidenavFieldList isSidenavOpen={open} />
            </div>
          ) : !open && !isMobile ? (
            <div className={style}>
              <SidenavFieldList isSidenavOpen={open} />
            </div>
          ) : (
            <div className={style}></div>
          )}
        </div>
      </UserContextProvider>
    );
  }
}
export default SideNav;
