import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const uploadPhotoToServer = async (photo, path) => {
  const response = await fetch(photo);
  const file = await response.blob();
  const uniqueId = Date.now().toString();

  const photoRef = await ref(storage, `${path}/${uniqueId}.jpg`);

  const uploadPicture = await uploadBytes(photoRef, file, {
    contentType: "image/jpeg",
  });

  const photoURL = await getDownloadURL(uploadPicture.ref);

  return photoURL;
};
