import { createSlice } from '@reduxjs/toolkit';
import { getPinnedCommentData } from '../services/comment';
import { CommentData } from '../../type/cmntTypes';

interface InitialState {
  commentId: string | null;
  deletedIdArray: Array<string>;
  pinnedId: string | null;
  pinnedData: CommentData[] | null;
  check: string | null;
  result: any;
}

const initialState: InitialState = {
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
    getPinnedCommentId(state, action) {
      state.commentId = action.payload;
      state.check = 'pinned';
    },
    getReportCommentId(state, action) {
      state.commentId = action.payload;
      state.check = 'report';
    },
    getUnpinnedCommentId(state, action) {
      state.commentId = action.payload;
      state.check = 'unpinned';
    },
    deleteCommentId(state, action) {
      state.deletedIdArray = [...state.deletedIdArray, action.payload];
    },
    initPinnedComment(state) {
      state.pinnedId = null;
      state.pinnedData = null;
    },
    initDeletedComment(state) {
      state.deletedIdArray = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPinnedCommentData.fulfilled, (state, { payload }) => {
        state.pinnedId = payload.pinnedId;
        state.pinnedData = payload.pinnedData;
      })
      .addCase(getPinnedCommentData.rejected, (state, { payload }) => {
        return {
          ...state,
          result: payload,
        };
      });
  },
});

export const {
  getDeleteCommentId,
  getUnpinnedCommentId,
  getPinnedCommentId,
  getReportCommentId,
  deleteCommentId,
  initPinnedComment,
  initDeletedComment,
} = commentSlice.actions;

export default commentSlice;
