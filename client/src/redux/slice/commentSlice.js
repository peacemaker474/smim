import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentId: undefined,
  deletedIdArray: [],
  pinnedId: undefined,
  pinnedData: undefined,
  check: undefined,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getDeleteCommentId: {
      reducer(state, action) {
        state.commentId = action.payload.commentId;
        state.check = 'delete';
      },
      prepare(commentId) {
        return {
          payload: {
            commentId,
          },
        };
      },
    },
    deleteCommentId: {
      reducer(state, action) {
        state.deletedIdArray.push(action.payload.commentId);
      },
      prepare(commentId) {
        return {
          payload: {
            commentId,
          },
        };
      },
    },
    getPinnedCommentId: {
      reducer(state, action) {
        state.commentId = action.payload.commentId;
        state.check = 'pinned';
      },
      prepare(commentId) {
        return {
          payload: {
            commentId,
          },
        };
      },
    },
    pinnedCommentId: {
      reducer(state, action) {
        state.pinnedId = action.payload.commentId;
      },
      prepare(commentId) {
        return {
          payload: {
            commentId,
          },
        };
      },
    },
    getPinnedCommentData: {
      reducer(state, action) {
        state.pinnedData = action.payload.pinnedData;
      },
      prepare(pinnedData) {
        return {
          payload: {
            pinnedData,
          },
        };
      },
    },
    resetComment(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getDeleteCommentId,
  deleteCommentId,
  getPinnedCommentId,
  pinnedCommentId,
  getPinnedCommentData,
  resetComment,
} = commentSlice.actions;

export default commentSlice.reducer;
