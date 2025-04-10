import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/Componts/Navbar";
import Sidebar from "@/Componts/Sidebar";
import React from "react";

const Applayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white-100">
      {location.pathname === "/" && <Navbar />}
      {(location.pathname.startsWith("/survey") ||
        location.pathname === "/summary") && <Sidebar />}

      <div className="flex-1 max-w-3xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Applayout;
