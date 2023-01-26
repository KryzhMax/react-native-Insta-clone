import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "./auth/AuthSlice";
// import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
