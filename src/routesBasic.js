import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Profile from "./pages/Profile";
import Issue from "./pages/Issue";
import PullRequest from "./pages/PullRequest";
import App from "./App";

const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/issue" element={<Issue />} />
      <Route path="/pullrequest" element={<PullRequest />} />
    </>
  ),
  {
    basename: "/redux-github-viewer",
  }
);

export default routesBasic;
