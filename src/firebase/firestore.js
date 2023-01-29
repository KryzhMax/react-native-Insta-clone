import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

export const uploadPostToServer = async (post) => {
  console.log("uploadPostToServer", post);
  try {
    const postCollection = collection(db, "posts");
    console.log("postCollection", postCollection);
    const docRef = await addDoc(postCollection, {
      post,
    });
    console.log("docRef: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// const querySnapshot = await getDocs(collection(db, "posts"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
