import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

export const getPinnedCommentData = createAsyncThunk(
  'PIN_COMMENT',
  async (pinnedId: string | null, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${http}/comment/${pinnedId}`, {
        withCredentials: true,
      });

      return { pinnedData: data, pinnedId };
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
