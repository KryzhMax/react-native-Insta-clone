import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  name: "",
  email: "",
  isAuth: false,
  isLoading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
      state.isLoading = false;
    },
    register: (state, { payload }) => {
      console.log(payload);
      state.isAuth = true;
      state.userId = payload.uid;
    },
    updateUserProfile: (state, { payload }) => ({
      // ...state,
      // userId: payload,
      ...state,
      userId: payload.userId,
    }),
  },
});

// Action creators are generated for each case reducer function
// export const { login, logout, register } = authSlice.actions;

export const authReducer = authSlice.reducer;
console.log(authSlice);
