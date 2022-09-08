import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postId: null,
  postWriter: null,
  postAge: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostData(state, action) {
      state.postId = action.payload.postId;
      state.postWriter = action.payload.postWriter;
      state.postAge = action.payload.postAge;
    },
    resetPost(state) {
      state.postId = null;
      state.postWriter = null;
      state.postAge = null;
    },
  },
});

export const { getPostData, resetPost } = postSlice.actions;

export default postSlice.reducer;
