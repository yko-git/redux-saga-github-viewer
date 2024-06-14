import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN;

export const instance = axios.create({
  baseURL: "https://api.github.com/",

  headers: {
    Authorization: `token ${TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});
