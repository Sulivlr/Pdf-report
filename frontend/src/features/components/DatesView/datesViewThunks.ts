import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import type { FileEntity } from '@/types';

export const fetchDatesViewFiles = createAsyncThunk<FileEntity[]>(
  'datesViewFiles/fetchFiles',
  async () => {
    const { data: files } = await axiosApi.get<FileEntity[]>('/files');
    return files;
  },
);
