import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
    console.log(res.data);
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
      console.log(value);
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
        toast.success("ISSUEを追加しました", {
          icon: false,
        });
      })
      .addCase(addItems.rejected, (state, action) => {
        state.status = "addItems:failed";
        state.error = action.error.message;
        console.log(state.status);
        toast.error("追加に失敗しました", {
          icon: false,
        });
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
        toast.success("ISSUEを更新しました", {
          icon: false,
        });
      })
      .addCase(updateItems.rejected, (state, action) => {
        state.status = "updateItems:failed";
        console.log(state.status);
        state.error = action.error.message;
        toast.error("更新に失敗しました", {
          icon: false,
        });
      })

      // closeItems
      .addCase(closeItems.pending, (state, action) => {
        state.status = "closeItems:pending";
        console.log(state.status);
      })
      .addCase(closeItems.fulfilled, (state, action) => {
        state.status = "closeItems:fulfilled";
        // toast.success("ISSUEを削除しました", {
        //   icon: false,
        // });
        console.log(state.status);
      })
      .addCase(closeItems.rejected, (state, action) => {
        state.status = "closeItems:failed";
        console.log(state.status);
        state.error = action.error.message;
        // toast.error("削除に失敗しました", {
        //   icon: false,
        // });
      });
  },
});

export default issue.reducer;
