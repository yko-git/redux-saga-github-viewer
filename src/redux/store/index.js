import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "../issueSlice";
import usersReducer from "../userSlice";
import modalReducer from "../modalSlice";
import profileReducer from "../profileSlice";

const store = configureStore({
  reducer: {
    issues: issueReducer,
    users: usersReducer,
    modal: modalReducer,
    profile: profileReducer,
  },
});

export default store;
