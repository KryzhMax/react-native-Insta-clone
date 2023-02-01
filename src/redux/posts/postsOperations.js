import { onSnapshot, collection, doc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsSlice } from "./postsSlice";
import { db } from "../../firebase/config";
import { uploadPhotoToServer } from "../../firebase/uploadPhoto";
import { updatePost, uploadPostToServer } from "../../firebase/firestore";

const { createPost } = postsSlice.actions;

export const uploadDataToServer = createAsyncThunk(
  "posts/uploadPost",
  async (
    { title, location, photo, userId /*avatar*/ },
    { rejectWithValue }
  ) => {
    try {
      const photoURL = await uploadPhotoToServer(photo, "postImage");
      // console.log("photoURL", photoURL);
      const postUploaded = await uploadPostToServer({
        title,
        location,
        photo: photoURL,
        userId,
        // avatar,
        comments: [],
      });

      return postUploaded;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPost",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await onSnapshot(
        collection(db, "posts"),
        (snapshot) => {
          const posts = [];
          snapshot.docs.map((snapshot) => {
            const data = snapshot.data();
            posts.push({ id: snapshot.id, ...data.post });
          });
          posts.reverse();

          dispatch(createPost(posts));
        },
        (error) => console.log("snapshot-error", error)
      );
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const addComments = createAsyncThunk(
  "posts/getComments",

  async ({ postId, comment, user }, { rejectWithValue }) => {
    console.log("!!!!addComments", user);
    try {
      await updatePost(postId, { comment, user });
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "posts/getAllComments",
  async ({ postId }, { rejectWithValue }) => {
    try {
      await onSnapshot(
        doc(db, "posts", `${postId}`),
        (snapshot) => {
          const data = snapshot.data().comments;

          return data;
        },
        (error) => console.log("snapshot-error", error)
      );
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
