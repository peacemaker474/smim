import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: false,
  age: false,
  hashtag: false,
  content: false,
};

const postFormCheckSlice = createSlice({
  name: 'postCreate',
  initialState,
  reducers: {
    titleCheck(state) {
      state.title = true;
      state.age = false;
      state.hashtag = false;
      state.content = false;
    },
    ageCheck(state) {
      state.title = false;
      state.age = true;
      state.hashtag = false;
      state.content = false;
    },
    hashtagCheck(state) {
      state.title = false;
      state.age = false;
      state.hashtag = true;
      state.content = false;
    },
    contentCheck(state) {
      state.title = false;
      state.age = false;
      state.hashtag = false;
      state.content = true;
    },
    resetCheck(state) {
      state.title = false;
      state.age = false;
      state.hashtag = false;
      state.content = false;
    },
  },
});

export const { titleCheck, ageCheck, hashtagCheck, contentCheck, resetCheck } =
  postFormCheckSlice.actions;

export default postFormCheckSlice.reducer;
