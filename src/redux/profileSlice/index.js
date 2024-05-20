import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    name: "mitani",
    email: "hoge@example.com",
    imageUrl:
      "https://avatars1.githubusercontent.com/u/123527248?s=60&u=5f2d871352830fdf1a79ee285e0712044105ca91&v=4",
  },
  reducers: {
    profileDate: (state, action) => {
      return state;
    },
  },
});
export const { profileDate } = profile.actions;
export default profile.reducer;
