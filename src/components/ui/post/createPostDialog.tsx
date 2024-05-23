import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SidenavField from '../sidenav/sidenavField';
import AddIcon from '@mui/icons-material/Add';
import {useRef, useState, useEffect} from 'react';
interface Props {
  isSidenavOpen: boolean;
}
function CreatePostDialog({isSidenavOpen}: Props) {
  const fileInputRef = useRef<any>(null);

  const SvgImage = () => {
    return (
      <svg viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          <defs>
            <style>{`.b{fill:none;stroke:#3f3f46;stroke-linecap:round;stroke-linejoin:round;}`}</style>
          </defs>
          <path
            className='b'
            d='M29.4995,12.3739c.7719-.0965,1.5437,.4824,1.5437,1.2543h0l2.5085,23.8312c.0965,.7719-.4824,1.5437-1.2543,1.5437l-23.7347,2.5085c-.7719,.0965-1.5437-.4824-1.5437-1.2543h0l-2.5085-23.7347c-.0965-.7719,.4824-1.5437,1.2543-1.5437l23.7347-2.605Z'></path>
          <path
            className='b'
            d='M12.9045,18.9347c-1.7367,.193-3.0874,1.7367-2.8945,3.5699,.193,1.7367,1.7367,3.0874,3.5699,2.8945,1.7367-.193,3.0874-1.7367,2.8945-3.5699s-1.8332-3.0874-3.5699-2.8945h0Zm8.7799,5.596l-4.6312,5.6925c-.193,.193-.4824,.2894-.6754,.0965h0l-1.0613-.8683c-.193-.193-.5789-.0965-.6754,.0965l-5.0171,6.1749c-.193,.193-.193,.5789,.0965,.6754-.0965,.0965,.0965,.0965,.193,.0965l19.9719-2.1226c.2894,0,.4824-.2894,.4824-.5789,0-.0965-.0965-.193-.0965-.2894l-7.8151-9.0694c-.2894-.0965-.5789-.0965-.7719,.0965h0Z'></path>
          <path
            className='b'
            d='M16.2814,13.8211l.6754-6.0784c.0965-.7719,.7719-1.3508,1.5437-1.2543l23.7347,2.5085c.7719,.0965,1.3508,.7719,1.2543,1.5437h0l-2.5085,23.7347c0,.6754-.7719,1.2543-1.5437,1.2543l-6.1749-.6754'></path>
          <path
            className='b'
            d='M32.7799,29.9337l5.3065,.5789c.2894,0,.4824-.193,.5789-.4824,0-.0965,0-.193-.0965-.2894l-5.789-10.5166c-.0965-.193-.4824-.2894-.6754-.193h0l-.3859,.3859'></path>
        </g>
      </svg>
    );
  };
  const CreateDialogContentHeader = () => {
    return (
      <div className='w-full border-b-[1px] border-zinc-300 flex justify-center py-3'>
        <span className='tracking-tight text-lg'>Create new post</span>
      </div>
    );
  };
  const CreateDialogContent = () => {
    const [postImage, setPostImage] = useState<any>('');
    const handleOnChooseButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const handleImageOnChange = (e: any) => {
      setPostImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
      <div className='flex flex-col items-center space-y-7 font-manrope'>
        <CreateDialogContentHeader />
        <div className='flex flex-col items-center'>
          <div className='w-32'>
            <SvgImage />
          </div>
          <span className='text-xl font-light'>Add image to create new post.</span>
        </div>
        <button
          onClick={handleOnChooseButtonClick}
          className='px-3 py-2 bg-emerald-500 text-zinc-100 text-base rounded-lg'>
          <span>Choose from device</span>
          <input type='file' className='hidden' ref={fileInputRef} onChange={handleImageOnChange} />
        </button>
      </div>
    );
  };
  const CreateDialog = ({children}: any) => {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <CreateDialogContent />
        </DialogContent>
      </Dialog>
    );
  };
  return (
    <CreateDialog>
      <SidenavField icon={<AddIcon className='text-3xl' />} title={'New post'} iconOnly={!isSidenavOpen} />
    </CreateDialog>
  );
}
export default CreatePostDialog;
