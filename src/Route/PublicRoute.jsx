import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const userFromRedux = useSelector((state) => state.auth.user);
  const userFromStorage = localStorage.getItem("user");

  const isLoggedIn = userFromRedux || userFromStorage;

  if (isLoggedIn) {
    return <Navigate to="/Report" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;