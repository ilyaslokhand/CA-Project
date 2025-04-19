import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userFromRedux = useSelector((state) => state.auth.user);
  const userFromStorage = JSON.parse(localStorage.getItem("user") || "null");

  const isLoggedIn = userFromRedux || userFromStorage;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
