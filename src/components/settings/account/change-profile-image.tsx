'use client';
import PhotoIcon from '@mui/icons-material/Photo';
import UserAvatar from '@/components/ui/user-avatar';
import {useRef, useState} from 'react';
import Label from './label';
import {IUser} from '@/interfaces/user-interface';

interface Props {
  onImageChange: any;
  user: IUser;
}
export default function ChangeProfileImage({onImageChange, user}: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeProfileImage = (e: HTMLInputElement) => {
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
        <div className='flex flex-col w-32 space-y-2 relative '>
          <Label text={'Profile photo'} disabled={false} />
          <UserAvatar
            profileImageUrl={selectedImage ? selectedImage : user!?.profileImageUrl}
            name={user!?.name}
            className='h-36 w-36'
          />
          <div
            className='absolute bottom-0 right-0 w-8 h-8 bg-zinc-700/80 flex items-center justify-center rounded-full cursor-pointer'
            onClick={handleIconClick}>
            <PhotoIcon className='text-zinc-300' />
            <input
              type='file'
              className='hidden'
              ref={inputRef}
              onChange={(e) => {
                handleChangeProfileImage(e.target);
              }}
            />
          </div>
        </div>
      </>
    );
  }
}
