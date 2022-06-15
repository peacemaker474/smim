import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    createComment: {
      reducer(state, action) {
        state._id = action.payload._id;
        state.writer = action.payload.writer;
        state.createAt = action.payload.createAt;
        state.parent_id = action.payload.parent_id;
        state.group_id = action.payload.group_id;
        state.post_id = action.payload.post_id;
      },
      prepare(_id, writer, createAt, parent_id, group_id, post_id) {
        return {
          payload: {
            _id,
            writer,
            createAt,
            like_count: 0,
            parent_id,
            group_id,
            post_id,
          },
        };
      },
    },
  },
});

export const { createComment } = commentSlice.actions;

export default commentSlice.reducer;
