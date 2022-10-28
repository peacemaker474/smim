import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  option: '',
  keyword: '',
};

const searchKeywordSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getSearchContent(state, action) {
      return {
        ...state,
        keyword: action.payload.keyword,
        option: action.payload.option,
      };
    },

    resetSearch(state) {
      return {
        ...state,
        keyword: '',
        option: '',
      };
    },
  },
});

export const { getSearchContent, resetSearch } = searchKeywordSlice.actions;

export default searchKeywordSlice;
