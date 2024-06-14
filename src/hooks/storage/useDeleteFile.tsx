import {getStorage, ref, deleteObject} from 'firebase/storage';

export default function useDeleteFile() {
  const deleteFile = async (url: string) => {
    try {
      const storage = getStorage();
      const httpsReference = ref(storage, url);
      await deleteObject(httpsReference);
    } catch (error) {}
  };
  return {deleteFile};
}
