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
      const { id, title, body, status } = action.payload;
      state.form = {
        id,
        title,
        body,
        status,
      };
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});
export const { openModal, closeModal } = modal.actions;
export default modal.reducer;
