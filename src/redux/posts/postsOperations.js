import { onSnapshot, collection, doc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postsSlice } from "./postsSlice";
import { db } from "../../firebase/config";
import { uploadPhotoToServer } from "../../firebase/uploadPhoto";
import { updatePost, uploadPostToServer } from "../../firebase/firestore";

const { createPost } = postsSlice.actions;

export const uploadDataToServer = createAsyncThunk(
  "posts/uploadPost",
  async ({ title, location, photo, userId, date }, { rejectWithValue }) => {
    try {
      const photoURL = await uploadPhotoToServer(photo, "postImage");
      const postUploaded = await uploadPostToServer({
        title,
        location,
        photo: photoURL,
        userId,
        comments: [],
        date,
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
          const sortedPosts = posts.sort((a, b) => b.date - a.date);

          dispatch(createPost(sortedPosts));
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
      let data;
      await onSnapshot(
        doc(db, "posts", `${postId}`),
        (snapshot) => {
          data = snapshot.data().post;
          console.log("!!!Upon update", data);
          return data;
        },
        (error) => console.log("snapshot-error", error)
      );
      // Not sure if I need it
      await updatePost(postId, { data });
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);
