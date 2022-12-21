import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostOwnerData } from '../../type/postTypes';

interface CreatedItem {
  _id: string;
  writer: PostOwnerData;
  parentId: string | null;
  groupId?: string;
  postId: string;
  text: string;
  createAt: string;
  likeCount: number;
  children: Array<string>;
  block: boolean;
  likeUsers: Array<string>;
  like: boolean;
  __v: number;
}

interface CreatedItemProps {
  _id: string;
  writer: PostOwnerData;
  parentId: string | null;
  groupId?: string;
  postId: string;
  text: string;
}

interface initialStateProps {
  commentArray: Array<CreatedItem>; // this is an array, but array of what?
}

const initialState: initialStateProps = {
  commentArray: [],
};

const commentCreateSlice = createSlice({
  name: 'commentCreate',
  initialState,
  reducers: {
    createComment(state, action: PayloadAction<CreatedItemProps>) {
      state.commentArray = [
        ...state.commentArray,
        {
          _id: action.payload._id,
          writer: action.payload.writer,
          createAt: String(new Date()),
          parentId: action.payload.parentId,
          groupId: action.payload.groupId,
          postId: action.payload.postId,
          text: action.payload.text,
          like: false,
          likeCount: 0,
          children: [],
          block: false,
          likeUsers: [],
          __v: 0,
        },
      ];
    },
    resetComment(state) {
      state.commentArray = [];
    },
  },
});

export const { createComment, resetComment } = commentCreateSlice.actions;

export default commentCreateSlice;
