import { createSlice } from '@reduxjs/toolkit';

interface IPostState {
  postWriter: string | null;
  postAge: number | null;
}

const initialState: IPostState = {
  postWriter: null,
  postAge: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostData(state, action) {
      state.postWriter = action.payload.postWriter;
      state.postAge = action.payload.postAge;
    },
    resetPost(state) {
      state.postWriter = null;
      state.postAge = null;
    },
  },
});

export const { getPostData, resetPost } = postSlice.actions;

export default postSlice.reducer;
