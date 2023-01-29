import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { Alert } from "react-native";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { store } from "../store";
import { authSlice } from "./AuthSlice";
import { uploadPhotoToServer } from "../../firebase/uploadPhoto";
import { uploadPostToServer } from "../../firebase/firestore";

const { updateUserProfile, authSignOut } = authSlice.actions;

export const authSignInUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userToUpdate = {
        userId: user.uid,
        email: user.email,
        name: user.displayName,
      };

      dispatch(updateUserProfile(userToUpdate));
    } catch (error) {
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        Alert.alert("This user is not found");
      }
      if (errorMessage === "Firebase: Error (auth/wrong-password).") {
        Alert.alert("Wrong password");
      } else {
        Alert.alert("Something went wrong, try to reload the app");
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const authRegisterUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
        email: email,
        // photoURL: userAvatarUrl,
      });

      const userToUpdate = {
        userId: user.uid,
        email: user.email,
        name: user.displayName,
      };

      dispatch(updateUserProfile(userToUpdate));
    } catch (error) {
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        Alert.alert("This email is in use");
      } else {
        Alert.alert("Something went wrong, try to reload the app");
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const onAuthStateChange = createAsyncThunk(
  "auth/stateChange",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          const userToUpdate = {
            userId: user.uid,
            email: user.email,
            name: user.displayName,
          };

          dispatch(updateUserProfile(userToUpdate));
        }
      });
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      signOut(auth);
      dispatch(authSignOut());
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const uploadDataToServer = createAsyncThunk(
  "auth/uploadPost",
  async ({ title, location, photo, userId }, { rejectWithValue }) => {
    try {
      const photoURL = await uploadPhotoToServer(photo, "postImage");
      console.log("photoURL", photoURL);
      const createPost = await uploadPostToServer({
        title,
        location,
        photo: photoURL,
        userId,
        comments: [],
      });
      console.log("createPost", createPost);

      return createPost;
    } catch (error) {
      const errorMessage = error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// // -----Also working code, but without Thunks-------
// export const authRegisterUser = async ({ email, password }) => {
//   await createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log("user11111", user);

//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       Alert.alert(error.message);
//       // ..
//     });
// };
