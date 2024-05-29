import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "../issueSlice";
import modalReducer from "../modalSlice";
import profileReducer from "../profileSlice";
import cartReducer from "../fetchSlice";

const store = configureStore({
  reducer: {
    issues: issueReducer,
    modal: modalReducer,
    profile: profileReducer,
    fetchItem: cartReducer,
  },
});

export default store;
