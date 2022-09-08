import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

export const getPinnedCommentData = createAsyncThunk(
  'PIN_COMMENT',
  async ({ pinnedId }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${http}/comment/${pinnedId}`, {
        withCredentials: true,
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
