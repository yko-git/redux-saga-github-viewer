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

export const getFetchItems = createAsyncThunk(
  "fetchItem/getFetchItems",
  async () => {
    try {
      const res = await instance.get("/issues");

      // console.log(res.data);
      return res.data;
    } catch (e) {
      console.log("error", e);
    }
  }
);

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

const issue = createSlice({
  name: "issues",
  initialState,
  reducers: {
    // addTodo: (state, action) => {
    //   state.items.push(action.payload);
    //   console.log(state.items);
    // },
    // updateTodo: (state, action) => {
    //   console.log(action.payload.title + "action.payload");
    //   const issue = state.find((it) => it.id === action.payload.id);
    //   state.items.title = action.payload.items;
    //   if (issue) {
    //     state.issue.title = state.items
    //     state.issue.body = action.payload.body;
    //     state.issue.status = action.payload.status;
    //   }
    // },
    // deleteTodo: (state, action) => {
    //   Object.keys(action.payload).forEach((id) => {
    //     const index = state.findIndex((it) => it.id === id);
    //     if (index !== -1) {
    //       state.splice(index, 1);
    //     }
    //   });
    // },
  },
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
      })
      .addCase(addItems.fulfilled, (state, action) => {
        state.status = "addItems:fulfilled";
        state.items.push(action.payload);
        // state.items.push({ title: "aiu" });
        console.log(state.items);
      })

      .addCase(addItems.rejected, (state, action) => {
        state.status = "addItems:failed";
        state.error = action.error.message;
      });
  },
});

export const { addTodo, updateTodo, deleteTodo } = issue.actions;
export default issue.reducer;
