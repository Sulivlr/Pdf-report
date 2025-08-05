import { configureStore } from '@reduxjs/toolkit';
import { filesReducer } from '../features/components/FileView/filesSlice';
import { foldersReducer } from '../features/components/SidebarFolders/foldersSlice';

export const store = configureStore({
  reducer: {
    folders: foldersReducer,
    files: filesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
