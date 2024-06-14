import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "../issueSlice";
import usersReducer from "../userSlice";
import modalReducer from "../modalSlice";

const store = configureStore({
  reducer: {
    issues: issueReducer,
    users: usersReducer,
    modal: modalReducer,
  },
});

export default store;
