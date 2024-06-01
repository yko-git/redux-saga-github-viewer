import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "../issueSlice";
import modalReducer from "../modalSlice";
import profileReducer from "../profileSlice";

const store = configureStore({
  reducer: {
    issues: issueReducer,
    modal: modalReducer,
    profile: profileReducer,
  },
});

export default store;
