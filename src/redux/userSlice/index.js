import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: [],
};

const TOKEN = process.env.REACT_APP_TOKEN;

const instance = axios.create({
  baseURL: "https://api.github.com/users/",

  headers: {
    Authorization: `token ${TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

// getUserItems
export const getUserItems = createAsyncThunk(
  "fetchItem/getUserItems",
  async () => {
    const res = await instance.get("yko-git");
    return res.data;
  }
);

// createSlice
const user = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUserItems
      .addCase(getUserItems.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserItems.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
      })

      .addCase(getUserItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default user.reducer;
