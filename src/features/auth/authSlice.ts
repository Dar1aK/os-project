import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { userAuth } from "./authAPI";
import { AuthRequest } from "./types";

export interface AuthState {
  authStatus: boolean;
  email: string;
  lastName: string;
  error: string;
  status: "success" | "loading" | "failed";
}

const initialState: AuthState = {
  authStatus: false,
  email: "",
  lastName: "",
  error: "",
  status: "success",
};

export const authAsync = createAsyncThunk(
  "auth/userAuth",
  async (body: AuthRequest) => {
    try {
      const response = await userAuth(body);
      return response;
    } catch (e: any) {
      return Promise.reject(e?.error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authAsync.pending, (state) => {
        state.status = "loading";
        state.authStatus = false;
        state.email = "";
        state.lastName = "";
        state.error = "";
      })
      .addCase(authAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.authStatus = true;
        state.email = payload.email;
        state.lastName = payload.lastName;
      })
      .addCase(authAsync.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message || "Something happend. Try later";
      });
  },
});

export const selectStatus = (state: RootState) => state.auth.authStatus;

export const selectName = (state: RootState) => state.auth.lastName;

export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
