import {getStorage, ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import firebase from 'firebase/app';
import {app} from '@/firebase/config';
app;
export interface IImage {
  uid: string;
  image: File;
}
const storage = getStorage();
export async function uploadImage({uid, image}: IImage) {
  const filePath = `images/${uid}/${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytes(newImageRef, image);
  return await getDownloadURL(newImageRef);
}
