import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../todoSlice";
import modalReducer from "../modalSlice";
import profileReducer from "../profileSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    modal: modalReducer,
    profile: profileReducer,
  },
});

export default store;
