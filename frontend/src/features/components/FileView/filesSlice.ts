import { createSlice } from '@reduxjs/toolkit';
import { fetchFiles } from './filesThunks';
import type { FileEntity } from '../../../types';

export interface FilesState {
  items: FileEntity[];
  isFetching: boolean;
}

const initialState: FilesState = {
  items: [],
  isFetching: false,
};

export const FilesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchFiles.fulfilled, (state, { payload: files }) => {
        state.isFetching = false;
        state.items = files;
      })
      .addCase(fetchFiles.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectFiles: (state) => state.items,
    selectIsFetching: (state) => state.isFetching,
  },
});

export const filesReducer = FilesSlice.reducer;

export const { selectFiles, selectIsFetching } = FilesSlice.selectors;
