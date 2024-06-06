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
    try {
      const res = await instance.get("/issues");
      const newData = res.data.filter((value) => !value.pull_request);
      return newData;
    } catch (e) {
      console.log("error", e);
    }
  }
);

// addItems
export const addItems = createAsyncThunk("fetchItem/addItems", async (data) => {
  try {
    const res = await instance.post("/issues", {
      title: data.title,
      body: data.body,
    });
    console.log(data);
    return res.data;
  } catch (e) {
    console.log("error", e);
  }
});

// updateItems
export const updateItems = createAsyncThunk(
  "fetchItem/updateItems",
  async (data) => {
    try {
      console.log(data);
      const res = await instance.patch(`/issues/${data.id}`, {
        title: data.title,
        body: data.body,
        state: data.status,
      });
      return res.data;
    } catch (e) {
      console.log("error", e);
    }
  }
);

// closeItems
export const closeItems = createAsyncThunk(
  "fetchItem/closeItems",
  async (data) => {
    try {
      debugger;
      const checkedItems = Object.keys(data);
      let closeList = {};
      for await (const value of checkedItems) {
        console.log(value);
        closeList = await instance.patch(`/issues/${Number(value)}`, {
          state: "closed",
        });
        return closeList.data;
      }
    } catch (e) {
      console.log("error", e);
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
        console.log(state.status);
      })
      .addCase(getFetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "fulfilled";
        console.log(state.status);
      })

      .addCase(getFetchItems.rejected, (state, action) => {
        state.status = "failed";
        console.log(state.status);
        state.error = action.error.message;
      })

      // addItems
      .addCase(addItems.pending, (state, action) => {
        state.status = "addItems:pending";
        console.log(state.status);
      })
      .addCase(addItems.fulfilled, (state, action) => {
        state.status = "addItems:fulfilled";
        state.items.push(action.payload);
        console.log(state.status);
      })
      .addCase(addItems.rejected, (state, action) => {
        state.status = "addItems:failed";
        state.error = action.error.message;
        console.log(state.status);
      })

      // updateItems
      .addCase(updateItems.pending, (state, action) => {
        state.status = "updateItems:pending";
        console.log(state.status);
      })
      .addCase(updateItems.fulfilled, (state, action) => {
        state.status = "updateItems:fulfilled";
        console.log(state.status);
        state.items = state.items.map((value) =>
          value.id === action.payload.id ? action.payload : value
        );
      })
      .addCase(updateItems.rejected, (state, action) => {
        state.status = "updateItems:failed";
        console.log(state.status);
        state.error = action.error.message;
      })

      // closeItems
      .addCase(closeItems.pending, (state, action) => {
        state.status = "closeItems:pending";
        console.log(state.status);
      })
      .addCase(closeItems.fulfilled, (state, action) => {
        state.status = "closeItems:fulfilled";
        state.items = state.items.map((value) =>
          value.id === action.payload.id ? action.payload : value
        );
        console.log(action.payload);
      })
      .addCase(closeItems.rejected, (state, action) => {
        state.status = "closeItems:failed";
        console.log(state.status);
        state.error = action.error.message;
      });
  },
});

export const { deleteTodo } = issue.actions;
export default issue.reducer;
