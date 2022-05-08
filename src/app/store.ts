import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
import filesSlice from "../features/files/filesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    files: filesSlice,
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
