import {deleteObject, getStorage, list, listAll, ref} from 'firebase/storage';
export default function useDeleteUserFilesFromStorage() {
  const deleteUserFilesFromStorage = async (uid: string) => {
    try {
      const storage = getStorage();
      const folderRef = ref(storage, `images/${uid}`);
      const listResults = await listAll(folderRef);
      const deletePromises = listResults.items.map((itemRef) => deleteObject(itemRef));
      await Promise.all(deletePromises);
    } catch (error) {}
  };
  return {deleteUserFilesFromStorage};
}
