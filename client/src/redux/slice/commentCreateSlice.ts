import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostOwnerData } from '../../type/postTypes';

interface CreatedItem {
  _id: string;
  writer: PostOwnerData;
  parent_id: string | null;
  group_id: string | null | undefined;
  post_id: string | undefined;
  text: string;
  createAt: string;
  like_count: number;
  children: Array<string>;
  complain_count: number;
  like_users: Array<string>;
  __v: number;
}

interface CreatedItemProps {
  _id: string;
  writer: PostOwnerData;
  parent_id: string | null;
  group_id: string | null | undefined;
  post_id: string | undefined;
  text: string;
}

const initialState: CreatedItem[] = [];

const commentCreateSlice = createSlice({
  name: 'commentCreate',
  initialState,
  reducers: {
    createComment(state, action: PayloadAction<CreatedItemProps>) {
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
          children: [],
          complain_count: 0,
          like_users: [],
          __v: 0,
        },
      ];
    },
    resetComment() {
      return [];
    },
  },
});

export const { createComment, resetComment } = commentCreateSlice.actions;

export default commentCreateSlice;
