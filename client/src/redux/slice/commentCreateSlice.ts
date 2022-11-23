import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WriterProp {
  userId: string;
  nickname: string;
  imageUrl: string;
}
interface CreatedItem {
  _id: string;
  writer: WriterProp;
  parent_id: string | null;
  group_id: string | null;
  post_id: string | undefined;
  text: string;
}

const initialState: CreatedItem[] = [];

const commentCreateSlice = createSlice({
  name: 'commentCreate',
  initialState,
  reducers: {
    createComment(state, action: PayloadAction<CreatedItem>) {
      return [
        ...state,
        {
          _id: action.payload._id,
          writer: action.payload.writer,
          createAt: String(new Date()),
          parent_id: action.payload.parent_id,
          group_id: action.payload.group_id,
          post_id: action.payload.post_id,
          text: action.payload.text,
          like: false,
          like_count: 0,
        },
      ];
    },
    resetComment() {
      return [];
    },
  },
});

export const { createComment, resetComment } = commentCreateSlice.actions;

export default commentCreateSlice.reducer;
