import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  name: "",
  email: "",
  avatar: null,
  isAuth: false,
  isLoading: false,
  error: false,
  // comments: [],
};

const actions = {
  updateUserProfile: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    name: payload.name,
    email: payload.email,
    avatar: payload.avatar,
    isAuth: true,
  }),
  authStateChange: (state, { payload }) => ({
    ...state,
    isAuth: payload.isAuth,
  }),
  authSignOut: () => initialState,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: actions,
});

export const authReducer = authSlice.reducer;
