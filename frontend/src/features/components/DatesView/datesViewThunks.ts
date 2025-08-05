import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import type { File } from '../../../types';

export const fetchDatesViewFiles = createAsyncThunk<File[]>(
  'datesViewFiles/fetchFiles',
  async () => {
    const { data: files } = await axiosApi.get<File[]>('/files');
    return files;
  },
);
