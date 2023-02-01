import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "./auth/AuthSlice";
import { postsReducer, postsSlice } from "./posts/postsSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
  [postsSlice.name]: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
