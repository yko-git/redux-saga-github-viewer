import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import routesBasic from "./routesBasic";
import { createGlobalStyle } from "styled-components";
import cssVariables from "./css_variables";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

const variable = cssVariables.variable;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Lato, "Lucida Grande", "Lucida Sans Unicode", Tahoma, sans-serif;
    font-size: ${variable.textSize};
    color: ${variable.textColor};
    line-height: ${variable.lineHeight};
    *, *:before, *:after {
        box-sizing: border-box;
    }
    a {
        color: ${variable.textColor};
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
