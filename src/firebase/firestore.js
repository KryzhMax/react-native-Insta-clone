import {
  collection,
  setDoc,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./config";
console.log("db", db);

export const uploadPostToServer = async (post) => {
  console.log("post", post);
  try {
    const postCollection = collection(db, "posts");
    console.log("postCollection", postCollection);
    const docRef = await setDoc(
      collection(db, "posts"),
      {
        post: "abc",
      }
      //   { merge: true }
    );
    console.log("docRef: ", docRef);
    return docRef;

    // const querySnapshot = await getDocs(collection(db, "posts"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });

    // const unsub = onSnapshot(collection(db, "groups"), (querySnapshot) => {
    //   console.log("Updated Docs: ", querySnapshot.docChanges);
    //   console.log("Docs: ", querySnapshot.docs);
    // });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
