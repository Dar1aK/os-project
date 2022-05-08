import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getDirList, openFile, saveFile } from "./filesAPI";
import { ListFilesType, SortNames, SortTypes } from "./types";

export interface FilesState {
  list: ListFilesType[];
  currentDir: string;
  sort: {
    name: SortNames;
    type: SortTypes;
  };
  error: string;
  status: "success" | "loading" | "failed";
}

const initialState: FilesState = {
  list: [],
  currentDir: "./",
  sort: {
    name: "name",
    type: "asc",
  },
  error: "",
  status: "success",
};

export const getDirAsync = createAsyncThunk(
  "files/getDirList",
  async (body: string) => {
    try {
      const response = await getDirList(body);
      return response;
    } catch (e: any) {
      return Promise.reject(e?.error);
    }
  }
);

export const openFileAsync = createAsyncThunk(
  "files/openFile",
  async (file: string) => {
    try {
      const response = await openFile(file);
      return response;
    } catch (e: any) {
      return Promise.reject(e?.error);
    }
  }
);

export const saveFileAsync = createAsyncThunk(
  "files/saveFile",
  async (body: { file: string; content: string }) => {
    try {
      const response = await saveFile(body);
      return response;
    } catch (e: any) {
      return Promise.reject(e?.error);
    }
  }
);

export const filesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeDirectory: (state, action: PayloadAction<string>) => {
      state.currentDir = action.payload;
    },
    clearDirectory: (state) => {
      state.currentDir = initialState.currentDir;
    },
    sortTable: (
      state,
      { payload }: PayloadAction<{ name: SortNames; type: SortTypes }>
    ) => {
      const { list } = state;
      const newList = sortArrayByProperty(list, payload);
      state.sort = payload;
      state.list = newList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDirAsync.pending, (state) => {
        state.status = "loading";
        state.list = [];
        state.error = "";
      })
      .addCase(getDirAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        const newList = sortArrayByProperty(payload, state.sort);
        state.list = newList;
      })
      .addCase(getDirAsync.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message || "Something happend. Try later";
      })
      .addCase(openFileAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        console.log("open", payload);
      })
      .addCase(saveFileAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        console.log("save", payload);
      });
  },
});

const sortArrayByProperty = (
  list: any[],
  sort: {
    name: SortNames;
    type: SortTypes;
  }
) => {
  const { name, type } = sort;
  const newList = [...list].sort((a, b) => {
    if (type === "asc") {
      if (a[name] > b[name]) {
        return 1;
      }
      if (a[name] < b[name]) {
        return -1;
      }
    } else {
      if (a[name] < b[name]) {
        return 1;
      }
      if (a[name] > b[name]) {
        return -1;
      }
    }
    return 0;
  });
  return newList;
};

export const selectFiles = (state: RootState) => state.files;

export const selectSort = (state: RootState) => state.files.sort;

export const { changeDirectory, clearDirectory, sortTable } =
  filesSlice.actions;

export default filesSlice.reducer;
