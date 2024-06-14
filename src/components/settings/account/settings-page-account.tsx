'use client';
import {useState} from 'react';
import ChangeBackgroundImage from './change-background-image';
import ChangeDetailsInputs from './change-details-inputs';
import ChangeProfileImage from './change-profile-image';
import {IUpdate, IUser, IUserProfileUpdate} from '@/interfaces/user-interface';
import useUpdateProfile from '@/hooks/user/settings/useUpdateProfile';
import {useUserContext} from '@/hooks/context/useUserContext';
import {IImage, uploadImage} from '@/firebase/storage';
import {useToast} from '@/components/ui/use-toast';
import CheckIcon from '@mui/icons-material/Check';
import useDeleteFile from '@/hooks/storage/useDeleteFile';

export default function SettingsPageAccount() {
  const {toast} = useToast();
  const {user, dispatch} = useUserContext();
  const {updateProfile} = useUpdateProfile();
  const {deleteFile} = useDeleteFile();
  const [updateData, setUpdateData] = useState<IUpdate>();

  const handleUpdateProfile = async () => {
    var firebaseProfileImageUrl = undefined;
    var firebaseBackgroundImageUrl = undefined;
    if (updateData && user) {
      try {
        if (updateData.profileImageFile) {
          const uploadImageObject: IImage = {
            uid: user.uid,
            image: updateData.profileImageFile,
          };
          firebaseProfileImageUrl = await uploadImage(uploadImageObject);
          if (user.profileImageUrl) {
            await deleteFile(user.profileImageUrl);
          }
        }
        if (updateData.backgroundImageFile) {
          const uploadImageObject: IImage = {
            uid: user.uid,
            image: updateData.backgroundImageFile,
          };
          firebaseBackgroundImageUrl = await uploadImage(uploadImageObject);
          if (user.backgroundImageUrl) {
            await deleteFile(user.backgroundImageUrl);
          }
        }

        const body: IUserProfileUpdate = {
          name: updateData.name ? updateData.name : undefined,
          country: updateData.country ? updateData.country : undefined,
          profileImageUrl: firebaseProfileImageUrl ? firebaseProfileImageUrl : undefined,
          backgroundImageUrl: firebaseBackgroundImageUrl ? firebaseBackgroundImageUrl : undefined,
        };

        const res = await updateProfile(user?.uid, body);
        const userUpdated: Partial<IUser> = {
          ...res,
        };
        toast({
          action: (
            <div className='w-full flex items-center justify-center'>
              <span className='first-letter:capitalize mr-2'>Profile updated </span>
              <CheckIcon className=' text-emerald-500' />
            </div>
          ),
        });
        dispatch({type: 'SET_USER_DATA', payload: {...user, ...userUpdated}});
      } catch (error) {}
    }
  };

  const handleImageChange = async (image: File) => {
    setUpdateData((prevState) => ({
      ...prevState,
      profileImageFile: image,
    }));
  };

  const handleBackgroundImageChange = (image: File) => {
    setUpdateData((prevState) => ({
      ...prevState,
      backgroundImageFile: image,
    }));
  };

  const handleDetailsChange = (name: string, country: string) => {
    setUpdateData((prevState) => ({
      ...prevState,
      name: name,
      country: country,
    }));
  };

  return (
    <div className='flex flex-col space-y-6 pb-6'>
      <ChangeProfileImage onImageChange={(value: File) => handleImageChange(value)} />
      <ChangeDetailsInputs onDetailsChange={(name: string, country: string) => handleDetailsChange(name, country)} />
      <ChangeBackgroundImage onImageChange={(value: File) => handleBackgroundImageChange(value)} />

      <button
        className='w-full sm:w-96 px-8 py-2 bg-emerald-500 dark:bg-emerald-600 text-zinc-100 text-base rounded-lg'
        onClick={handleUpdateProfile}>
        Save changes
      </button>
    </div>
  );
}
