import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const actions = {
  createPost: (state, { payload }) => ({
    ...state,
    posts: payload,
  }),
  // updateCommentList: (state, { payload }) => {
  //   state.posts.posts.comments = payload;
  // },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: actions,
});

export const postsReducer = postsSlice.reducer;
