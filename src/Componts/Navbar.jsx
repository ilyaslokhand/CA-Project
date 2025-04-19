import React, { useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetLogoutState } from "@/Redux/logout/logoutSlice"; // ✅ UNCOMMENT this
import {  resetUserState } from "@/Redux/Auth/authSlice";
import Notification from "./Notification";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const { loading, success, error } = useSelector((state) => state.logout);
  

  const toggleNotifications = ()=>{
    setShowNotifications(!showNotifications)
  }


  const handleLogout = () => {
   
    dispatch(logoutUser()); 
  };

  useEffect(() => {

    if (success) {
  
      localStorage.removeItem("user");
      localStorage.removeItem("questionnaire_response"); 
      dispatch(resetUserState()); 

      setTimeout(() => {
        dispatch(resetLogoutState());
        navigate("/");
      }, 200);
    }

    if (error) {
      console.error("❌ Logout error:", error);
    }
  }, [success, error, dispatch, navigate]);


  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-[30px] font-normal text-[#7427C2] font-lustria">
        EasyDoc
      </h1>
      <h2 className="text-2xl font-bold text-center mt-4">Your Reports</h2>

      <div className="flex items-center gap-4 relative">
        {/* Bell icon with dropdown */}
        <div className="relative">
          <button
            className="text-[#A855F7] cursor-pointer"
            onClick={toggleNotifications}
          >
            <Bell size={20} />
          </button>
          {showNotifications && (
            <Notification />
          )}
        </div>

        {/* Logout button */}
        <button
          className="text-[#A855F7] cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
