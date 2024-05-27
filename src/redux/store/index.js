import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../todoSlice";
import modalReducer from "../modalSlice";
import profileReducer from "../profileSlice";
import cartReducer from "../fetchSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    modal: modalReducer,
    profile: profileReducer,
    fetchItem: cartReducer,
  },
});

export default store;
