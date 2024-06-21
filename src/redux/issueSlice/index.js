import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../GithubAPI";

const initialState = {
  items: [],
};

const issuesUrl = "repos/yko-git/redux-saga-github-viewer/issues";

// getFetchItems
export const getFetchItems = createAsyncThunk(
  "fetchItem/getFetchItems",
  async () => {
    const res = await instance.get(issuesUrl, {
      icon: false,
    });
    const newData = res.data.filter((value) => !value.pull_request);
    return newData;
  }
);

// addItems
export const addItems = createAsyncThunk("fetchItem/addItems", async (data) => {
  const res = await instance.post(issuesUrl, {
    title: data.title,
    body: data.body,
  });
  return res.data;
});

// updateItems
export const updateItems = createAsyncThunk(
  "fetchItem/updateItems",
  async (data) => {
    const res = await instance.patch(`${issuesUrl}/${data.id}`, {
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
      await instance.patch(`${issuesUrl}/${Number(value)}`, {
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

        for (let i = 0; i < state.items.length; i++) {
          state.items[i].createdAt = action.payload[i].created_at.substr(0, 10);
          delete state.items[i].created_at;

          state.items[i].updatedAt = action.payload[i].updated_at.substr(0, 10);
          delete state.items[i].updated_at;

          state.items[i].htmlUrl = action.payload[i].html_url;
          delete state.items[i].html_url;
        }
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
