import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const http = 'http://localhost:4000';

export const getPinnedCommentData = createAsyncThunk(
  'PIN_COMMENT',
  async ({ pinnedId, tkn }, { rejectWithValue }) => {
    let commentData;
    try {
      if (tkn) {
        const { data } = await axios.get(`${http}/comment/${pinnedId}/detail`, {
          withCredentials: true,
        });
        commentData = data.data;
      } else {
        const { data } = await axios.get(`${http}/comment/${pinnedId}`);
        commentData = data.data;
      }

      return commentData;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
