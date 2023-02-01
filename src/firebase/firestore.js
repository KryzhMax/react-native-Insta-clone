import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "./config";

export const uploadPostToServer = async (post) => {
  try {
    const postCollection = collection(db, "posts");
    const docRef = await addDoc(postCollection, {
      post,
    });

    return docRef.id;
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const updatePost = async (post, comment) => {
  try {
    await updateDoc(doc(db, "posts", `${post}`), {
      "post.comments": arrayUnion({ ...comment.comment }),
    });
  } catch (error) {
    Alert.alert(error.message);
  }
};
