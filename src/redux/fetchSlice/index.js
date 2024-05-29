import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
};

const instance = axios.create({
  baseURL:
    "https://api.github.com/repos/yko-git/redux-saga-github-viewer/issues",
});

export const getFetchItems = createAsyncThunk(
  "fetchItem/getFetchItems",
  async () => {
    try {
      const res = await instance();

      return res.data;
    } catch (e) {
      console.log("error", e);
    }
  }
);

const fetchSlice = createSlice({
  name: "fetchItem",
  initialState,
  reducers: {
    // reducers
  },
  extraReducers: (builder) => {
    builder.addCase(getFetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      console.log(state.items);
    });
  },
});
// console.log(fetchSlice);

export default fetchSlice.reducer;
