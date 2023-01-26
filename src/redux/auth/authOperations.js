import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { app } from "../../firebase/config";
import { store } from "../store";
import { authSlice } from "./AuthSlice";

// 1.
export const authSignInUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      //   const dispatch = useDispatch();
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          //   dispatch(
          //     authSlice.actions.updateUserProfile({ userId: user.userId })
          //   );
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

export const authRegisterUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      //   const dispatch = useDispatch();
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          //   dispatch(
          //     authSlice.actions.updateUserProfile({ userId: user.userId })
          //   );
          const user = userCredential.user;
          console.log("Created new user", user.uid);
          // ...
        }
      );
    } catch (error) {
      //   console.log(error.message);
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        Alert.alert("This email is in use");
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// export const authSignOutUser = () = async (dispatch, getState) => { };

// export const authLogInUser = createAsyncThunk(
//   "auth/login",
//   async (user, { rejectWithValue }) => {
//     try {
//       //   const { data } = await axios.post("/auth/login", user);

//       return data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         toast.error("Email or password invalid");
//         return rejectWithValue(error.request.message);
//       }
//       toast.error("Oops, something went wrong");
//       return rejectWithValue(error.request.status);
//     }
//   }
// );

// -----Also working code, but without Thunks-------
// export const authRegisterUser = async ({ email, password }) => {
//   const auth = getAuth();
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
