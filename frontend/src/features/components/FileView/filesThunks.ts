import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import type { FileEntity, FileMutation } from '../../../types';

export const fetchFiles = createAsyncThunk<FileEntity[]>(
  'files/fetchFiles',
  async () => {
    const { data: files } = await axiosApi.get<FileEntity[]>('/files');
    return files;
  },
);

export const createFile = createAsyncThunk<void, FileMutation>(
  'files/createFile',
  async (fileData) => {
    const formData = new FormData();
    formData.append('folderId', fileData.folderId.toString());
    if (fileData.file) {
      formData.append('file', fileData.file);
    }
    console.log(fileData);
    await axiosApi.post('/files/upload', formData);
  },
);
