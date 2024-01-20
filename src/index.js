import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import SearchPage from "./pages/Search";
import Landing from "./pages/Landing";
import LikedImagesComponent from "./contexts/LikedImages";
import UserPage from "./pages/User";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    // loader: <>Loading</>,
    children: [
      {
        path: "/search/:query",
        element: <SearchPage />
        // loader: <>Loading Page</>
      },
      {
        path: "/search",
        element: <SearchPage />
        // loader: <>Loading Page</>
      },
      {
        path: "/user",
        element: <UserPage />
        // loader: <>Loading Page</>
      },
      {
        path: "/",
        element: <Landing />
        // loader: <>Loading Page</>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LikedImagesComponent>
      <RouterProvider router={router} />
    </LikedImagesComponent>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
