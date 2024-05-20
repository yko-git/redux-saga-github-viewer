import { createSlice } from "@reduxjs/toolkit";
import issueData from "../../utils/issueData";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate().toString().padStart(2, 0);

const todo = createSlice({
  name: "todos",
  initialState: issueData,
  reducers: {
    addTodo: (state, action) => {
      const newId = crypto.getRandomValues(new Uint16Array(10));

      const newTodo = {
        id: newId.join(""),
        title: action.payload.title,
        text: action.payload.text,
        status: "Open",
        author: "MITANI",
        createday: `${date}-${month.toString().padStart(2, 0)}-${year}`,
        updateday: `${date}-${month.toString().padStart(2, 0)}-${year}`,
      };

      state.push(newTodo);
    },
    updateTodo: (state, action) => {
      const todo = state.find((it) => it.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.text = action.payload.text;
        todo.status = action.payload.status;
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
export const { addTodo, updateTodo, deleteTodo } = todo.actions;
export default todo.reducer;
