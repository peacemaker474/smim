import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  option: '',
  keyword: '',
};

const searchKeywordSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getSearchOption(state, action) {
      return {
        ...state,
        option: action.payload,
      };
    },
    getSearchKeyword(state, action) {
      return {
        ...state,
        keyword: action.payload,
      };
    },
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

export const { getSearchOption, getSearchKeyword, getSearchContent, resetSearch } = searchKeywordSlice.actions;

export default searchKeywordSlice;
