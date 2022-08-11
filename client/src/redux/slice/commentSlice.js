import { createSlice } from '@reduxjs/toolkit';
import { getPinnedCommentData } from '../services/comment';

const initialState = {
  commentId: undefined,
  deletedIdArray: [],
  pinnedId: undefined,
  pinnedData: undefined,
  check: undefined,
  result: undefined,
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
    pinnedInitCommentId(state) {
      state.pinnedId = undefined;
      state.pinnedData = undefined;
    },
    getUnpinnedCommentId: {
      reducer(state, action) {
        state.commentId = action.payload.commentId;
        state.check = 'unpinned';
      },
      prepare(commentId) {
        return {
          payload: {
            commentId,
          },
        };
      },
    },
    unpinnedCommentId(state, action) {
      state.pinnedData = undefined;
      state.pinnedId = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPinnedCommentData.fulfilled, (state, action) => {
        state.pinnedId = action.payload[0]._id;
        state.pinnedData = action.payload;
      })
      .addCase(getPinnedCommentData.rejected, (state, action) => {
        state.result = action.payload;
      });
  },
});

export const {
  getDeleteCommentId,
  deleteCommentId,
  getPinnedCommentId,
  pinnedInitCommentId,
  getUnpinnedCommentId,
  unpinnedCommentId,
} = commentSlice.actions;

export default commentSlice.reducer;
