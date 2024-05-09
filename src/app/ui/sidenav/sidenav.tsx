'use client';
import {useEffect, useState} from 'react';
import './styles.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import SidenavFieldList from './sidenavFieldList';

function SideNav() {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [style, setStyle] = useState<string>('');
  const {width} = useWindowDimensions();

  useEffect(() => {
    if (width && width > 640) {
      setIsMobile(false);
      setStyle('closed-sidenav-initial');
      setOpen(false);
    } else {
      setIsMobile(true);
      setOpen(false);
      setStyle('closed-sidenav-initial-mobile');
    }
  }, [width]);

  useEffect(() => {
    if (!open && !isMobile) {
      setStyle('closed-sidenav');
      //bug stylu zamykania
    }
  }, [open]);

  const changeStyle = () => {
    if (open) {
      setStyle('closed-sidenav');
    } else {
      setStyle('opened-sidenav');
    }
  };

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
export default SideNav;
