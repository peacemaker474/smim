import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentId: undefined,
};

const commentDataSlice = createSlice({
  name: 'commentData',
  initialState,
  reducers: {
    getCommentId: {
      reducer(state, action) {
        state.commentId = action.payload.commentId;
      },
      prepare(commentId) {
        return {
          payload: {
            commentId,
          },
        };
      },
    },
    resetCommentId(state) {
      state.commentId = undefined;
    },
  },
});

export const { getCommentId, resetCommentId } = commentDataSlice.actions;

export default commentDataSlice.reducer;
