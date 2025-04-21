import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, resetLogoutState } from "@/Redux/logout/logoutSlice"; 
import {  resetUserState } from "@/Redux/Auth/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.logout);

  const handleLogout = () => {
     
      dispatch(logoutUser()); 
    };
  
    useEffect(() => {
  
      if (success) {
    
        localStorage.removeItem("user");
        localStorage.removeItem("questionnaire_response"); 
        localStorage.removeItem("is_new_notification")
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

  return handleLogout;
};

export default useLogout;
