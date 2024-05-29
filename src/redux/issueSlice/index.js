import { createSlice } from "@reduxjs/toolkit";
import issueData from "../../utils/issueData";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate().toString().padStart(2, 0);

const issue = createSlice({
  name: "issues",
  initialState: issueData,
  reducers: {
    addTodo: (state, action) => {
      const newId = crypto.getRandomValues(new Uint16Array(10));

      const newTodo = {
        id: newId.join(""),
        title: action.payload.title,
        text: action.payload.text,
        status: "Open",
        author: "yko-git",
        createday: `${date}-${month.toString().padStart(2, 0)}-${year}`,
        updateday: `${date}-${month.toString().padStart(2, 0)}-${year}`,
      };

      state.push(newTodo);
    },
    updateTodo: (state, action) => {
      const issue = state.find((it) => it.id === action.payload.id);
      if (issue) {
        issue.title = action.payload.title;
        issue.text = action.payload.text;
        issue.status = action.payload.status;
      }
    },
    deleteTodo: (state, action) => {
      Object.keys(action.payload).forEach((id) => {
        const index = state.findIndex((it) => it.id === id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      });
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = issue.actions;
export default issue.reducer;
