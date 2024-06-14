import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import routesBasic from "./routesBasic";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

const GlobalStyle = createGlobalStyle`
  body {
    --main-textColor: "#333";
    --main-linkColor: "rgb(3; 102; 214)";
    --main-textSize: "14px";
    --main-lineHeight: "1.5";
    margin: 0;
    padding: 0;
    font-family: Lato, "Lucida Grande", "Lucida Sans Unicode", Tahoma, sans-serif;
    font-size: var(--main-textSize);
    color: var(--main-textColor);
    line-height: var(--main-lineHeight);
    *, *:before, *:after {
        box-sizing: border-box;
    }
    a {
        color: var(--main-linkColor);
    }
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <RouterProvider router={routesBasic}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
