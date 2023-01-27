import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { Alert } from "react-native";
// import { getFirestore } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { store } from "../store";
import { authSlice } from "./AuthSlice";

const { updateUserProfile, login, register } = authSlice.actions;

// 1. Not settled yet
export const authSignInUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in

          const user = userCredential.user;
          console.log("Logged In", user);
          // ...
        }
      );
    } catch (error) {
      console.log(error.message);
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        Alert.alert("This user is not found");
      }
      if (errorMessage === "Firebase: Error (auth/wrong-password).") {
        Alert.alert("Wrong password");
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// 2. With Bugs

export const authRegisterUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    //   ({ email, password }) =>
    //   async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);

      const toUpdate = {
        userId: user.uid,
        email: user.email,
        //   name: user.name,
      };
      dispatch(updateUserProfile(toUpdate));
    } catch (error) {
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        Alert.alert("This email is in use");
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// 3. Fck

export const onAuthStateChange = createAsyncThunk(
  "auth/stateChange",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          const userUpdateProfile = {
            userId: user.uid,
            email: user.email,
          };

          dispatch(updateUserProfile(userUpdateProfile));
        }
      });
    } catch (error) {
      return rejectWithValue(error.message);
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
