import { createSlice } from "@reduxjs/toolkit";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

const result = await octokit.paginate.iterator(
  "GET /repos/{owner}/{repo}/issues",
  {
    owner: "yko-git",
    repo: "redux-saga-github-viewer",
  }
);

let issueList = [];
for await (const { data } of result) {
  for (const issue of data) {
    issueList = [
      ...issueList,
      {
        id: issue.id,
        title: issue.title,
        text: issue.body,
        status: issue.state,
        author: issue.user.login,
        createday: issue.updated_at,
        updateday: issue.updated_at,
      },
    ];
  }
}
console.log(issueList);

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate().toString().padStart(2, 0);

const todo = createSlice({
  name: "todos",
  initialState: issueList,
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
