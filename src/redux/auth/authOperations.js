import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import gravatar from "gravatar";
import { auth } from "../../firebase/config";
import { Alert } from "react-native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authSlice } from "./AuthSlice";
import { uploadPhotoToServer } from "../../firebase/uploadPhoto";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignInUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("authSignInUser-user", user);
      const userToUpdate = {
        userId: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
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
  async ({ name, email, password, avatar }, { rejectWithValue, dispatch }) => {
    console.log("authRegisterUser-name", name);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // if (!avatar) {
      //   photoURL = gravatar.url(email, { protocol: "http", s: "120" });
      // } else {
      const photoURL = avatar
        ? await uploadPhotoToServer(avatar, "avatar")
        : await uploadPhotoToServer(
            require("../../assets/img/User.jpg"),
            "avatar"
          );
      console.log("photoURL", photoURL);
      // }

      // const userAvatarUrl = await uploadPhotoToServer({ avatar }, "avatars");
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      const userToUpdate = {
        userId: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: photoURL,
      };
      dispatch(updateUserProfile(userToUpdate));
      console.log("user-afterUpdate", user);
    } catch (error) {
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        Alert.alert("This email is in use");
      } else {
        Alert.alert("Something went wrong, try to reload the app");
      }
      dispatch(authStateChange(false));
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
            avatar: user.avatar,
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
