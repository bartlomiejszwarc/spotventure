'use client';
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
import SidenavField from '../../sidenav/sidenav-field';
import AddIcon from '@mui/icons-material/Add';
import {useRef, useState, useEffect} from 'react';
import CreatePostDialogHeader from './create-post-dialog-header';
import SvgImage from './svg-image';
import {ScrollArea} from '@/components/ui/scroll-area';
import ClearIcon from '@mui/icons-material/Clear';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import categories from '@/data/post-categories';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import EventIcon from '@mui/icons-material/Event';
import {format} from 'date-fns';
import {cn} from '@/lib/utils';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import PaidIcon from '@mui/icons-material/Paid';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useCreatePost} from '@/hooks/post/useCreatePost';
import {uploadImage} from '@/firebase/storage';
import {IImage} from '@/firebase/storage';
import {auth} from '@/firebase/config';
import {useAuthState} from 'react-firebase-hooks/auth';
import CreatePostDialogSpinner from './create-post-dialog-spinner';
import CreatePostDialogSuccess from './create-post-dialog-success';

interface Props {
  isSidenavOpen: boolean;
}
function CreatePostDialog({isSidenavOpen}: Props) {
  const {createPost} = useCreatePost();
  const [user] = useAuthState(auth);
  const fileInputRef = useRef<any>(null);
  const CreateDialogContent = () => {
    const [processing, setProcessing] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const MAX_DESCRIPTION_LENGTH = 300;
    const [postImage, setPostImage] = useState<File | null>(null);
    const [postImageUrl, setPostImageUrl] = useState<string>('null');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [postLocation, setPostLocation] = useState<string>('');
    const [postDescription, setPostDescription] = useState<string>('');
    const [postCategory, setPostCategory] = useState<string>('');
    const [postDate, setPostDate] = useState<Date>();
    const [postIsFree, setPostIsFree] = useState<boolean>(false);
    const [postIsDisabilityFriendly, setPostIsDisabilityFriendly] = useState<boolean>(false);
    const [postIsParkingAvailable, setPostIsParkingAvailable] = useState<boolean>(false);
    const [postIsAvailableAnyTime, setPostIsAvailableAnyTime] = useState<boolean>(false);

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
    };

    const handleOnSubmit = async () => {
      setProcessing(true);
      try {
        if (!user) return;
        if (!postImage) return;
        const uploadImageObject: IImage = {
          uid: user.uid,
          image: postImage,
        };
        const firebaseImageUrl = await uploadImage(uploadImageObject);
        const body = {
          uid: user.uid,
          description: postDescription,
          imageUrl: firebaseImageUrl,
          category: postCategory,
          visitDate: postDate,
          location: postLocation,
          likedByIds: [],
          likesCount: 0,
          free: postIsFree,
          disabilityFriendly: postIsDisabilityFriendly,
          parkingAvailable: postIsParkingAvailable,
          anyTimeAvailable: postIsAvailableAnyTime,
        };
        await createPost(body);
        setProcessing(false);
        setSuccess(true);
      } catch (error) {
        setProcessing(false);
      }
    };

    const SelectCategory = () => {
      return (
        <Select onValueChange={setPostCategory} defaultValue={postCategory ? postCategory : ''}>
          <SelectTrigger className='w-full shadow-sm'>
            <SelectValue placeholder='Category' className='capitalize ' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, idx) => (
              <SelectItem key={idx} value={category.categoryName} className='capitalize'>
                {category.categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    };

    const Datepicker = () => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full shadow-sm justify-start text-left font-normal bg-background dark:bg-zinc-800',
                !postDate && 'text-muted-foreground',
              )}>
              <EventIcon className='mr-2 h-4 w-4' />
              {postDate ? format(postDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar mode='single' selected={postDate} onSelect={setPostDate} initialFocus />
          </PopoverContent>
        </Popover>
      );
    };

    const Switches = () => {
      return (
        <div className='w-full flex flex-col space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-1'>
              <PaidIcon className='text-base lg:text-lg' />
              <Label className='lg:text-base'>Free</Label>
            </div>
            <Switch checked={postIsFree} onCheckedChange={setPostIsFree} />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-1'>
              <AccessibleIcon className='text-base lg:text-lg' />
              <Label className='lg:text-base'>Disability-friendly</Label>
            </div>
            <Switch checked={postIsDisabilityFriendly} onCheckedChange={setPostIsDisabilityFriendly} />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-1'>
              <LocalParkingIcon className='text-base lg:text-lg' />
              <Label className='lg:text-base'>Parking</Label>
            </div>
            <Switch checked={postIsParkingAvailable} onCheckedChange={setPostIsParkingAvailable} />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-1'>
              <AccessTimeIcon className='text-base lg:text-lg' />
              <Label className='lg:text-base'>24/7 access</Label>
            </div>
            <Switch checked={postIsAvailableAnyTime} onCheckedChange={setPostIsAvailableAnyTime} />
          </div>
        </div>
      );
    };

    return (
      <div className='flex flex-col items-center space-y-7 font-manrope'>
        <CreatePostDialogHeader />

        {!postImage && !processing && !success && (
          <>
            <div className='flex flex-col items-center'>
              <div className='w-32'>
                <SvgImage />
              </div>
              <span className='text-xl font-light text-zinc-700 dark:text-zinc-300'>Add image to create new post.</span>
            </div>
            <button
              onClick={handleOnChooseButtonClick}
              className='px-8 py-2 bg-emerald-500 dark:bg-emerald-600 text-zinc-100 text-base rounded-lg'>
              <span className='text-zinc-300'>Choose from device</span>
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

        {postImage && !processing && !success && (
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
                      className='absolute top-2 right-2 p-1 bg-zinc-300 opacity-75 rounded-full z-50 cursor-pointer'
                      onClick={() => {
                        setPostImage(null);
                      }}>
                      <ClearIcon className='text-zinc-600 ' />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <span className='text-sm font-light tracking-wide '>Location</span>
                  <Input
                    className=' outline-none rounded-md shadow-sm'
                    onChange={(e) => {
                      setPostLocation(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <span className='text-sm font-light tracking-wide'>Description</span>
                  <Textarea
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    rows={8}
                    style={{resize: 'none'}}
                    className='outline-none rounded-md shadow-sm'
                    onChange={(e) => {
                      setPostDescription(e.target.value);
                    }}
                  />
                  <div className='flex w-full justify-end'>
                    <span className='text-xs'>
                      {postDescription.length} / {MAX_DESCRIPTION_LENGTH}
                    </span>
                  </div>
                </div>
                <SelectCategory />
                <Datepicker />
                <Switches />
              </div>
            </ScrollArea>

            <button
              onClick={handleOnSubmit}
              className='px-8 py-2 bg-emerald-500 dark:bg-emerald-700 text-zinc-100 text-base rounded-lg '>
              <span className=''>Share your spot</span>
            </button>
          </>
        )}
        {processing && <CreatePostDialogSpinner />}
        {!processing && success && <CreatePostDialogSuccess />}
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
      <SidenavField icon={<AddIcon style={{fontSize: '1.953rem'}} />} title={'New post'} iconOnly={!isSidenavOpen} />
    </CreateDialog>
  );
}
export default CreatePostDialog;
