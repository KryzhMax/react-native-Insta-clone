// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDD-e0XWGUsUmlxEOZFv5mZva7z1UZ93YE",
  authDomain: "rn-social-906d0.firebaseapp.com",
  databaseURL:
    "https://rn-social-906d0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rn-social-906d0",
  storageBucket: "rn-social-906d0.appspot.com",
  messagingSenderId: "420539286620",
  appId: "1:420539286620:web:3eafe20719f468d8da9299",
};

export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore();
