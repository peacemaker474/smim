import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postId: undefined,
  postWriter: undefined,
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
      state.postId = undefined;
      state.postWriter = undefined;
    },
  },
});

export const { getPostData, resetPost } = postSlice.actions;

export default postSlice.reducer;
