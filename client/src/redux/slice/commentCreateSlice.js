import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const commentCreateSlice = createSlice({
  name: 'commentCreate',
  initialState,
  reducers: {
    createComment: {
      reducer(state, action) {
        state.push({
          _id: action.payload._id,
          writer: action.payload.writer,
          createAt: action.payload.createAt,
          parent_id: action.payload.parent_id,
          group_id: action.payload.group_id,
          post_id: action.payload.post_id,
          text: action.payload.text,
          being: action.payload.being,
        });
      },
      prepare(_id, writer, createAt, parent_id, group_id, post_id, text) {
        return {
          payload: {
            _id,
            writer,
            createAt,
            like_count: 0,
            being: true,
            parent_id,
            group_id,
            post_id,
            text,
          },
        };
      },
    },
    resetCommentCreate(state, action) {
      state.length = 0;
    },
  },
});

export const { createComment, resetCommentCreate } = commentCreateSlice.actions;

export default commentCreateSlice.reducer;
