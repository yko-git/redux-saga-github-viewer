import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fetchItems: [],
};

export const getFetchItems = createAsyncThunk(
  "fetchItem/getFetchItems",
  async () => {
    try {
      const res = await axios(
        "https://api.github.com/repos/yko-git/redux-saga-github-viewer/issues"
      );

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
      state.fetchItems = action.payload;
      console.log(state.fetchItems);
    });
  },
});
// console.log(fetchSlice);

export default fetchSlice.reducer;
