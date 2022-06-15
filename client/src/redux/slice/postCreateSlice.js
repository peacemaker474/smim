import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  targetAge: 0,
  hashtag: [],
  content: '',
};

const postCreateSlice = createSlice({
  name: 'postCreate',
  initialState,
  reducers: {
    titleAdd: {
      reducer(state, action) {
        state.title = action.payload.title;
      },
      prepare(title) {
        return {
          payload: {
            title,
          },
        };
      },
    },
    contentAdd: {
      reducer(state, action) {
        state.content = action.payload.content;
      },
      prepare(content) {
        return {
          payload: {
            content,
          },
        };
      },
    },
    targetAgeAdd: {
      reducer(state, action) {
        state.targetAge = action.payload.targetAge;
      },
      prepare(targetAge) {
        return {
          payload: {
            targetAge,
          },
        };
      },
    },
    tagAdd: {
      reducer(state, action) {
        state.hashtag.push(action.payload.tag);
      },
      prepare(tag) {
        return {
          payload: {
            tag,
          },
        };
      },
    },
    tagDelete: {
      reducer(state, action) {
        state.hashtag = state.hashtag.filter((el) => el !== action.payload.tag);
      },
      prepare(tag) {
        return {
          payload: {
            tag,
          },
        };
      },
    },
    totalAdd: {
      reducer(state, action) {
        state.title = action.payload.title;
        state.content = action.payload.content;
        state.targetAge = action.payload.targetAge;
        state.hashtag = action.payload.hashtag;
      },
      prepare(title, content, targetAge, hashtag) {
        return {
          payload: {
            title,
            content,
            targetAge,
            hashtag,
          },
        };
      },
    },
    postReset(state) {
      state.title = '';
      state.content = '';
      state.targetAge = 0;
      state.hashtag = [];
    },
  },
});

export const { titleAdd, contentAdd, targetAgeAdd, tagAdd, totalAdd, tagDelete, postReset } =
  postCreateSlice.actions;

export default postCreateSlice.reducer;
