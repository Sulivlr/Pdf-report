import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Folder } from '../../../types';
import axiosApi from '../../../axiosApi';

export const fetchFolders = createAsyncThunk<Folder[]>(
  'folders/fetchFolders',
  async () => {
    const { data: folders } = await axiosApi.get<Folder[]>('/folders');
    return folders;
  },
);

export const createFolder = createAsyncThunk<Folder, { name: string }>(
  'folders/createFolder',
  async ({ name }) => {
    const { data: folder } = await axiosApi.post<Folder>('/folders', { name });
    return folder;
  },
);
