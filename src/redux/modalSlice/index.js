import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  form: {
    id: "",
    title: "",
    body: "",
    status: "Open",
  },
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.form.id = action.payload.id;
      state.form.title = action.payload.title;
      state.form.body = action.payload.body;
      state.form.status = action.payload.status;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});
export const { openModal, closeModal } = modal.actions;
export default modal.reducer;
