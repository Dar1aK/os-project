import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import filesSlice from "../features/files/filesSlice";
import gallerySlice from "../features/gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    files: filesSlice,
    gallery: gallerySlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
