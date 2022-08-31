import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const http = 'http://localhost:4000';

export const getPinnedCommentData = createAsyncThunk(
  'PIN_COMMENT',
  async ({ pinnedId }, { rejectWithValue }) => {
    let commentData;
    try {
      const { data } = await axios.get(`${http}/comment/${pinnedId}`, {
        withCredentials: true,
      });
      commentData = data.data;
      return commentData;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
