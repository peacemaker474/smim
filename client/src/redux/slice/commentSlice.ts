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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getPinnedCommentData.fulfilled, (state, { payload }) => {
  //       return {
  //         ...state,
  //         pinnedId: payload.pinnedId,
  //         pinnedData: payload.pinnedData,
  //       };
  //     })
  //     .addCase(getPinnedCommentData.rejected, (state, { payload }) => {
  //       return {
  //         ...state,
  //         result: payload,
  //       };
  //     });
  // },
});

export const {
  getDeleteCommentId,
  deleteCommentId,
  getPinnedCommentId,
  pinnedInitCommentId,
  getUnpinnedCommentId,
  unpinnedCommentId,
} = commentSlice.actions;

export default commentSlice;
