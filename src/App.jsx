import React from "react";
import { StrictMode } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ProtectedRoute from "./Route/ProtectedRoute";
import LoginPage from "./Pages/Login";
import ReportList from "./Pages/Reports";
import Applayout from "./Layout/Applayout";
import Survey from "./Pages/Survey";
import SurveySummary from "./Pages/SurveySummary";
import SubmissionSuccess from "./Pages/Submissionsuccess";
import PublicRoute from "./Route/PublicRoute";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Applayout />,
        children: [
          {
            path: "/Report",
            element: <ReportList />,
          },
          {
            path: "/survey",
            element: <Survey />,
          },
          {
            path: "/Summary",
            element: <SurveySummary />,
          },
          {
            path: "/sucess",
            element: <SubmissionSuccess />,
          },
        ],
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