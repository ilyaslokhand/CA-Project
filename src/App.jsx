import React from "react";
import { StrictMode } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import LoginPage from "./Pages/Login";
import ReportList from "./Pages/Reports";
import Applayout from "./Layout/Applayout";
import Survey from "./Pages/Survey";
import SurveySummary from "./Pages/SurveySummary";
import Submissionsuccess from "./Pages/SubmissionSuccess";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <ReportList />,
      },
      {
        path: "/survey",
        element: <Survey />, // Sidebar only
      },
      {
        path: "/Summary",
        element: <SurveySummary />,
      },
      {
        path: "/sucess",
        element: <Submissionsuccess />,
      },
    ],
  },
]);

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default App;
