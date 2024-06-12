'use client';
import {useState} from 'react';
import ChangeBackgroundImage from './change-background-image';
import ChangeDetailsInputs from './change-details-inputs';
import ChangeProfileImage from './change-profile-image';
import {IUpdate, IUserProfileUpdate} from '@/interfaces/user-interface';
import useUpdateProfile from '@/hooks/user/settings/useUpdateProfile';
import {useUserContext} from '@/hooks/context/useUserContext';
import {IImage, uploadImage} from '@/firebase/storage';

export default function SettingsPageAccount() {
  const {user} = useUserContext();
  const {updateProfile} = useUpdateProfile();
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
        }
        if (updateData.backgroundImageFile) {
          const uploadImageObject: IImage = {
            uid: user.uid,
            image: updateData.backgroundImageFile,
          };
          firebaseBackgroundImageUrl = await uploadImage(uploadImageObject);
        }

        const body: IUserProfileUpdate = {
          name: updateData.name ? updateData.name : undefined,
          country: updateData.country ? updateData.country : undefined,
          profileImageUrl: firebaseProfileImageUrl ? firebaseProfileImageUrl : undefined,
          backgroundImageUrl: firebaseBackgroundImageUrl ? firebaseBackgroundImageUrl : undefined,
        };

        await updateProfile(user?.uid, body);
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
