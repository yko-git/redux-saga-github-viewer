import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../GithubAPI";

const initialState = {
  user: {},
};

// getUserItems
export const getUserItems = createAsyncThunk(
  "fetchItem/getUserItems",
  async () => {
    const res = await instance.get("users/yko-git");
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
        state.user.avatarUrl = action.payload.avatar_url;
        state.user.htmlUrl = action.payload.html_url;
        state.user.publicRepos = action.payload.public_repos;
        state.status = "fulfilled";
      })

      .addCase(getUserItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default user.reducer;
