import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentArray: [],
};

const commentCreateSlice = createSlice({
  name: 'commentCreate',
  initialState,
  reducers: {
    createComment(state, action) {
      state.commentArray.push({
        _id: action.payload._id,
        writer: action.payload.writer,
        createAt: String(new Date()),
        parent_id: action.payload.parent_id,
        group_id: action.payload.group_id,
        post_id: action.payload.post_id,
        text: action.payload.text,
        like: false,
        like_count: 0,
      });
    },
    resetComment(state) {
      state.commentArray = [];
    },
  },
});

export const { createComment, resetComment } = commentCreateSlice.actions;

export default commentCreateSlice.reducer;
