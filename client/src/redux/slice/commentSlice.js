import { createSlice } from '@reduxjs/toolkit';
import { getPinnedCommentData } from '../services/comment';

const initialState = {
  commentId: null,
  deletedIdArray: [],
  pinnedId: null,
  pinnedData: null,
  check: null,
  result: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getDeleteCommentId(state, action) {
      state.commentId = action.payload;
      state.check = 'delete';
    },
    deleteCommentId(state, action) {
      state.deletedIdArray.push(action.payload);
    },
    getPinnedCommentId(state, action) {
      state.commentId = action.payload;
      state.check = 'pinned';
    },
    pinnedInitCommentId(state) {
      state.pinnedId = null;
      state.pinnedData = null;
    },
    getUnpinnedCommentId(state, action) {
      state.commentId = action.payload;
      state.check = 'unpinned';
    },
    unpinnedCommentId(state) {
      state.pinnedData = null;
      state.pinnedId = null;
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
