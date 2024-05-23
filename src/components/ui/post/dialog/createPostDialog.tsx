import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
import SidenavField from '../../sidenav/sidenavField';
import AddIcon from '@mui/icons-material/Add';
import {useRef, useState, useEffect} from 'react';
import CreatePostDialogHeader from './createPostDialogHeader';
import SvgImage from './svgImage';
import {ScrollArea} from '@/components/ui/scroll-area';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  isSidenavOpen: boolean;
}
function CreatePostDialog({isSidenavOpen}: Props) {
  const fileInputRef = useRef<any>(null);
  const CreateDialogContent = () => {
    const MAX_DESCRIPTION_LENGTH = 300;
    const [postImage, setPostImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [postDescription, setPostDescription] = useState<string>('');
    const handleOnChooseButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const handleImageOnChange = (e: HTMLInputElement) => {
      const image = e.files ? e.files[0] : null;
      if (!image) return;
      setPostImage(image);
      const url = URL.createObjectURL(image);
      setImagePreviewUrl(url);
      // TODO: const imageUrl
    };

    const handleTextAreaChange = (e: HTMLTextAreaElement) => {
      setPostDescription(e.value);
    };

    const handleOnSubmit = () => {};

    return (
      <div className='flex flex-col items-center space-y-7 font-manrope'>
        <CreatePostDialogHeader />

        {!postImage && (
          <>
            <div className='flex flex-col items-center'>
              <div className='w-32'>
                <SvgImage />
              </div>
              <span className='text-xl font-light'>Add image to create new post.</span>
            </div>
            <button
              onClick={handleOnChooseButtonClick}
              className='px-8 py-2 bg-emerald-500 text-zinc-100 text-base rounded-lg'>
              <span>Choose from device</span>
              <input
                type='file'
                className='hidden'
                ref={fileInputRef}
                onChange={(e) => {
                  handleImageOnChange(e.target);
                }}
              />
            </button>
          </>
        )}

        {postImage && (
          <>
            <ScrollArea className='w-full max-h-[450px]'>
              <div className='flex flex-col items-center px-6 space-y-3'>
                <div className='relative w-full flex justify-center '>
                  <div className='relative'>
                    <img
                      src={imagePreviewUrl}
                      alt='Image'
                      className='relative text-sm object-scale-down shadow-md max-h-72'
                    />
                    <div
                      className='absolute top-2 right-2 p-1 bg-zinc-300 opacity-75 rounded-full z-50'
                      onClick={() => {
                        setPostImage(null);
                      }}>
                      <ClearIcon className='text-zinc-600 ' />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <span className='text-sm font-light tracking-wide '>Location</span>
                  <input className='border-[1px] border-zinc-200 px-3 py-1 outline-none rounded-md shadow-sm' />
                </div>
                <div className='flex flex-col w-full'>
                  <span className='text-sm font-light tracking-wide'>Description</span>
                  <textarea
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    rows={8}
                    style={{resize: 'none'}}
                    className='border-[1px] border-zinc-200 px-3 py-1 outline-none rounded-md shadow-sm'
                    onChange={(e) => {
                      handleTextAreaChange(e.target);
                    }}
                  />
                  <div className='flex w-full justify-end'>
                    <span className='text-xs'>
                      {postDescription.length} / {MAX_DESCRIPTION_LENGTH}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <button onClick={handleOnSubmit} className='px-8 py-2 bg-emerald-500 text-zinc-100 text-base rounded-lg '>
              <span className=''>Share your spot</span>
            </button>
          </>
        )}
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
      <SidenavField icon={<AddIcon className='text-3xl ' />} title={'New post'} iconOnly={!isSidenavOpen} />
    </CreateDialog>
  );
}
export default CreatePostDialog;
