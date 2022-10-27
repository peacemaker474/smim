import { createSlice } from '@reduxjs/toolkit';

interface SearchFilter {
  filter: string;
}

const initialState: SearchFilter = {
  filter: 'newer',
};

const searchFilterSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectFilter(state, action) {
      state.filter = action.payload.filter;
    },
    resetFilter(state) {
      state.filter = 'newer';
    },
  },
});

export const { selectFilter, resetFilter } = searchFilterSlice.actions;

export default searchFilterSlice;
