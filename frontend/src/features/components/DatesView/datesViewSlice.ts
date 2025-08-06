import { createSlice } from '@reduxjs/toolkit';
import { fetchDatesViewFiles } from './datesViewThunks';
import type { FileEntity } from '@/types';

export interface datesViewState {
  items: FileEntity[];
  isFetching: boolean;
}

const initialState: datesViewState = {
  items: [],
  isFetching: false,
};

export const datesViewFilesSlice = createSlice({
  name: 'datesViewFiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatesViewFiles.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDatesViewFiles.fulfilled, (state, { payload: files }) => {
        state.isFetching = false;
        state.items = files;
      })
      .addCase(fetchDatesViewFiles.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectDatesViewFiles: (state) => state.items,
    selectDatesViewIsFetching: (state) => state.isFetching,
  },
});

export const dateViewFilesReducer = datesViewFilesSlice.reducer;

export const { selectDatesViewFiles, selectDatesViewIsFetching } =
  datesViewFilesSlice.selectors;
