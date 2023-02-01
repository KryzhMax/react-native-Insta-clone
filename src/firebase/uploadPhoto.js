import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const uploadPhotoToServer = async (photo, path) => {
  // console.log("photo", photo);
  const response = await fetch(photo);
  const file = await response.blob();
  const uniqueId = Date.now().toString();
  const photoRef = await ref(storage, `${path}/${uniqueId}`);

  await uploadBytes(photoRef, file);

  const photoURL = await getDownloadURL(photoRef);

  return photoURL;
};
