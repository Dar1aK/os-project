import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getPhotos, getComments } from "./galleryAPI";
import { Photos, Comments } from "./types";

export interface GalleryState {
  items: Photos[];
  pages: Photos[][];
  activePage: number;
  current: Photos;
  comments: Comments[];
  error: string;
  status: "success" | "loading" | "failed";
}

const initialState: GalleryState = {
  items: [],
  pages: [],
  activePage: 0,
  current: {
    albumId: 0,
    id: 0,
    title: "",
    url: "",
    thumbnailUrl: "",
  },
  comments: [],
  error: "",
  status: "success",
};

export const getPhotosAsync = createAsyncThunk(
  "gallery/getPhotos",
  async () => {
    try {
      const response = await getPhotos();
      return response;
    } catch (e: any) {
      return Promise.reject(e?.error);
    }
  }
);

export const getCommentsAsync = createAsyncThunk(
  "gallery/getComments",
  async (id: string) => {
    try {
      const response = await getComments(id);
      return response;
    } catch (e: any) {
      return Promise.reject(e?.error);
    }
  }
);

const COUNT = 10;

const splitItems = (response: Photos[]) => {
  const res = response.reduce((acc: Photos[][], val: Photos, i: number) => {
    if (i % COUNT === 0) {
      acc.push([val]);
    } else {
      acc[acc.length - 1].push(val);
    }
    return acc;
  }, []);
  return res;
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    changeDetail: (state, action: PayloadAction<string>) => {
      state.comments = [];
      const detail = current(state).items.find(
        ({ id }: { id: number | string }) => id == action.payload
      );
      if (detail) {
        state.current = detail;
      }
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPhotosAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        const pages = splitItems(payload);
        state.pages = pages;
        state.items = payload;
      })
      .addCase(getPhotosAsync.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message || "Something happend. Try later";
      })
      .addCase(getCommentsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentsAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.comments = payload;
      })
      .addCase(getCommentsAsync.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message || "Something happend. Try later";
      });
  },
});

export const selectPhotos = (state: RootState) => state.gallery.items;

export const selectGallery = (state: RootState) => state.gallery;

export const { changeDetail, changePage } = gallerySlice.actions;

export default gallerySlice.reducer;
