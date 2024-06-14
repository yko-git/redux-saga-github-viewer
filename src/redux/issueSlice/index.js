import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
};

const TOKEN = process.env.REACT_APP_TOKEN;

const instance = axios.create({
  baseURL: "https://api.github.com/repos/yko-git/redux-saga-github-viewer",

  headers: {
    Authorization: `token ${TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

// getFetchItems
export const getFetchItems = createAsyncThunk(
  "fetchItem/getFetchItems",
  async () => {
    const res = await instance.get("/issues", {
      icon: false,
    });
    const newData = res.data.filter((value) => !value.pull_request);
    return newData;
  }
);

// addItems
export const addItems = createAsyncThunk("fetchItem/addItems", async (data) => {
  const res = await instance.post("/issues", {
    title: data.title,
    body: data.body,
  });
  return res.data;
});

// updateItems
export const updateItems = createAsyncThunk(
  "fetchItem/updateItems",
  async (data) => {
    const res = await instance.patch(`/issues/${data.id}`, {
      title: data.title,
      body: data.body,
      state: data.status,
    });
    return res.data;
  }
);

// closeItems
export const closeItems = createAsyncThunk(
  "fetchItem/closeItems",
  async (data) => {
    const checkedItems = Object.keys(data);
    for await (const value of checkedItems) {
      await instance.patch(`/issues/${Number(value)}`, {
        state: "closed",
      });
    }
  }
);

// createSlice
const issue = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getFetchItems
      .addCase(getFetchItems.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getFetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "fulfilled";
      })

      .addCase(getFetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // addItems
      .addCase(addItems.pending, (state, action) => {
        state.status = "addItems:pending";
      })
      .addCase(addItems.fulfilled, (state, action) => {
        state.status = "addItems:fulfilled";
        state.items.push(action.payload);
      })
      .addCase(addItems.rejected, (state, action) => {
        state.status = "addItems:failed";
        state.error = action.error.message;
      })

      // updateItems
      .addCase(updateItems.pending, (state, action) => {
        state.status = "updateItems:pending";
      })
      .addCase(updateItems.fulfilled, (state, action) => {
        state.status = "updateItems:fulfilled";
        state.items = state.items.map((value) =>
          value.id === action.payload.id ? action.payload : value
        );
      })
      .addCase(updateItems.rejected, (state, action) => {
        state.status = "updateItems:failed";
        state.error = action.error.message;
      })

      // closeItems
      .addCase(closeItems.pending, (state, action) => {
        state.status = "closeItems:pending";
      })
      .addCase(closeItems.fulfilled, (state, action) => {
        state.status = "closeItems:fulfilled";
      })
      .addCase(closeItems.rejected, (state, action) => {
        state.status = "closeItems:failed";
        state.error = action.error.message;
      });
  },
});

export default issue.reducer;
