import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentArray: [],
};

const commentCreateSlice = createSlice({
  name: 'commentCreate',
  initialState,
  reducers: {
    createComment: {
      reducer(state, action) {
        state.commentArray.push({
          _id: action.payload._id,
          writer: action.payload.writer,
          createAt: action.payload.createAt,
          parent_id: action.payload.parent_id,
          group_id: action.payload.group_id,
          post_id: action.payload.post_id,
          text: action.payload.text,
          like: false,
          like_count: 0,
        });
      },
      prepare(_id, writer, parent_id, group_id, post_id, text) {
        return {
          payload: {
            _id,
            writer,
            createAt: String(new Date()),
            like_count: 0,
            parent_id,
            group_id,
            post_id,
            text,
          },
        };
      },
    },
    resetComment(state) {
      state.commentArray = [];
    },
  },
});

export const { createComment, resetComment } = commentCreateSlice.actions;

export default commentCreateSlice.reducer;
