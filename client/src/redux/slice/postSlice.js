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
  },
});

export const { getPostData } = postSlice.actions;

export default postSlice.reducer;
