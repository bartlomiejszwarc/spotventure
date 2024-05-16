'use client';
import {useEffect, useState} from 'react';
import './styles.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import SidenavFieldList from './sidenavFieldList';
import {usePathname} from 'next/navigation';

function SideNav() {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [style, setStyle] = useState<string>('');
  const {width} = useWindowDimensions();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
    if (width && width > 768) {
      setIsMobile(false);
      setStyle('closed-sidenav-initial');
      setOpen(false);
    } else {
      setIsMobile(true);
      setStyle('closed-sidenav-initial-mobile');
      setOpen(false);
    }
  }, [width, path]);

  useEffect(() => {
    if (!open) {
      setStyle('closed-sidenav');
    }
  }, [open]);

  const changeStyle = () => {
    if (open) {
      setStyle('closed-sidenav');
    } else {
      setStyle('open-sidenav');
    }
  };

  if (path !== '/signup' && path !== '/signin') {
    return (
      <div>
        {!open ? (
          <MenuIcon
            className={`absolute left-5 top-5  ${
              !isMobile ? 'text-zinc-300' : 'text-zinc-800'
            }   text-4xl cursor-pointer`}
            onClick={() => {
              changeStyle();
              setOpen(true);
            }}></MenuIcon>
        ) : (
          <CloseIcon
            className={`absolute left-5 top-5 text-zinc-300 text-4xl cursor-pointer`}
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
    );
  }
}
export default SideNav;
