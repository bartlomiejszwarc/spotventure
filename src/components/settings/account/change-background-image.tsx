'use client';
import PhotoIcon from '@mui/icons-material/Photo';
import {useUserContext} from '@/hooks/context/useUserContext';
import {useRef, useState} from 'react';
import Image from 'next/image';
interface Props {
  onImageChange: any;
}
export default function ChangeBackgroundImage({onImageChange}: Props) {
  const {user} = useUserContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeBackgroundImage = (e: HTMLInputElement) => {
    if (e.files) {
      const file = e.files[0];
      const url = URL.createObjectURL(e.files[0]);
      setSelectedImage(url);
      onImageChange(file);
    }
  };

  const handleIconClick = () => {
    inputRef!.current!.click();
  };

  if (user) {
    return (
      <>
        <div className='flex flex-col w-full sm:w-96 space-y-2 relative '>
          <span className='uppercase text-zinc-600 font-semibold dark:text-zinc-400 text-[15px] tracking-wide'>
            Background image
          </span>
          {!user.backgroundImageUrl && !selectedImage && (
            <div className='flex flex-col space-y-3 h-24 w-full sm:w-96'>
              <span className='text-sm dark:font-light'>You have not added a background photo yet</span>
              <button
                className='px-8 py-2 bg-emerald-500 dark:bg-emerald-600 text-zinc-100 text-base rounded-lg'
                onClick={handleIconClick}>
                Choose from device
              </button>
            </div>
          )}
          {user.backgroundImageUrl && !selectedImage && (
            <div className='relative aspect-video max-h-64 w-full'>
              {user.backgroundImageUrl && !selectedImage && (
                <Image
                  fill={true}
                  alt={'Background image'}
                  src={user.backgroundImageUrl}
                  className='object-cover rounded-md'
                />
              )}
            </div>
          )}
          {selectedImage && (
            <div className='relative aspect-video max-h-64 w-full'>
              <Image fill={true} alt={'Background image'} src={selectedImage} className='object-cover rounded-md' />
            </div>
          )}

          {(selectedImage || user.backgroundImageUrl) && (
            <div
              className='absolute bottom-3 right-3 w-8 h-8 bg-zinc-700/80 flex items-center justify-center rounded-full cursor-pointer'
              onClick={handleIconClick}>
              <PhotoIcon className='text-zinc-300' />
            </div>
          )}
          <input
            type='file'
            className='hidden'
            ref={inputRef}
            onChange={(e) => {
              handleChangeBackgroundImage(e.target);
            }}
          />
        </div>
      </>
    );
  }
}
