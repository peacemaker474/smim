import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const http = process.env.REACT_APP_SERVER_URL;

interface PinnedData {
  pinnedId: string;
  pinnedData: string;
}

interface PinnedId {
  pinnedId: string;
}

interface ErrorMessage {
  success: boolean;
  message: string;
}

export const getPinnedCommentData = createAsyncThunk<PinnedData, PinnedId, { rejectValue: ErrorMessage }>(
  'PIN_COMMENT',
  async ({ pinnedId }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${http}/comment/${pinnedId}`, {
        withCredentials: true,
      });

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
