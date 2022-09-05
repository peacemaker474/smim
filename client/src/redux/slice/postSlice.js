import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postId: null,
  postWriter: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostData: {
      reducer(state, action) {
        state.postId = action.payload.postId;
        state.postWriter = action.payload.postWriter;
      },
      prepare(postId, postWriter) {
        return {
          payload: {
            postId,
            postWriter,
          },
        };
      },
    },
    resetPost(state) {
      state.postId = null;
      state.postWriter = null;
    },
  },
});

export const { getPostData, resetPost } = postSlice.actions;

export default postSlice.reducer;
