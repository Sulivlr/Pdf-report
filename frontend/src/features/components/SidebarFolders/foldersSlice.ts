import type { Folder } from '../../../types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createFolder, fetchFolders } from './foldersThunks';

export interface FoldersState {
  items: Folder[];
  isFetching: boolean;
  isCreating: boolean;
  selectedFolderId: number | null;
}

const initialState: FoldersState = {
  items: [],
  isFetching: false,
  isCreating: false,
  selectedFolderId: null,
};

export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setSelectedFolder: (state, action: PayloadAction<number | null>) => {
      state.selectedFolderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchFolders.fulfilled, (state, { payload: folders }) => {
        state.isFetching = false;
        state.items = folders;
      })
      .addCase(fetchFolders.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(createFolder.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createFolder.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createFolder.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectFolders: (state) => state.items,
    selectFoldersFetching: (state) => state.isFetching,
    selectFoldersCreating: (state) => state.isCreating,
    selectSelectedFolderId: (state) => state.selectedFolderId,
    selectActiveFolder: (state) =>
      state.items.find((folder) => folder.id === state.selectedFolderId),
  },
});

export const { setSelectedFolder } = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;
export const {
  selectFolders,
  selectFoldersFetching,
  selectSelectedFolderId,
  selectActiveFolder,
  selectFoldersCreating,
} = foldersSlice.selectors;
