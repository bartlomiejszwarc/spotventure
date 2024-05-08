'use client';
import {useState} from 'react';
import './styles.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function SideNav() {
  const [style, setStyle] = useState<string>('closed-sidebar-initial');
  const [open, setOpen] = useState<boolean>(false);

  const changeStyle = () => {
    if (open) {
      setStyle('closed-sidebar slide-left');
    } else {
      setStyle('opened-sidebar');
    }
  };
  return (
    <div>
      {open}
      {!open ? (
        <MenuIcon
          className='absolute left-5 top-5 text-slate-800 text-4xl cursor-pointer'
          onClick={() => {
            changeStyle();
            setOpen(!open);
          }}></MenuIcon>
      ) : (
        <CloseIcon
          className='absolute left-5 top-5 text-slate-300 text-4xl cursor-pointer'
          onClick={() => {
            changeStyle();
            setOpen(!open);
          }}></CloseIcon>
      )}
      {open ? <div className={style}></div> : <div className={style}></div>}
    </div>
  );
}
export default SideNav;
