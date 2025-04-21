import { useEffect, useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa"; 
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "@/Redux/getReports/reportSlice";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "./useLogout";
import useReportClick from "./useReportClick";
import CalenderSvg from "@/utility/Svg/CalenderSvg";
import ArrowSvg from "@/utility/Svg/ArrowSvg";
import LoginSvg from "@/utility/Svg/LoginSvg";


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = useLogout()
  const [isOpen, setIsOpen] = useState(false);
  const handleReportClick = useReportClick();

  const activeReportTitle  = location?.state?.questionnaireName;


  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));

  const {
    reports,
    loading,
    error,
  } = useSelector((state) => state.report);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchReports(user.email));
    }
  }, [dispatch, user?.email]);

  const formattedReports =
  reports.map((item) => ({
      id: item.id,
      title: item.name,
      date: new Date(item.assigned_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    })) || [];

    const BackToReport = () => {
      localStorage.removeItem("questionnaire_response");
      navigate("/Report");
    };


  
    return (
      <div className="relative">
        
        <Button
          variant="ghost"
          className="fixed top-5 left-5 z-50 p-2 bg-[#A855F7] text-white rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </Button>
  
       
        <div
  className={`fixed top-0 left-0 h-screen bg-white shadow-lg p-5 transition-transform duration-300 w-[297px] z-40 flex flex-col ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  
  <div className="flex flex-col flex-grow overflow-hidden">
    
    <div className="shrink-0">
      <div className="text-center">
        <img
          src={user?.user_image}
          alt="Profile"
          className="w-20 h-20 mx-auto rounded-full"
        />
        <h2 className="mt-2 text-lg font-semibold">{user?.full_name}</h2>
      </div>

      <Button
         variant="ghost"
        className="w-full flex items-center justify-center bg-gray-200 mt-5 z-[1] font-roboto text-[15px] cursor-pointer font-bold text-[#6750A4]"
        style={{ padding: "20px" }}
        onClick={BackToReport}
      >
        <span>Back To Reports</span>
      </Button>
    </div>

    
    <div className="flex-grow overflow-y-auto mt-5 flex flex-col gap-3">
    {loading ? (
        <p className="text-sm text-gray-500 text-center">Loading reports...</p>
      ) : error ? (
        <p className="text-sm text-red-500 text-center">Error: {error}</p>
      ) : formattedReports.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">No reports found.</p>
      ) : (
        formattedReports.map((report) => (
          <Card
            key={report.id}
            className={`p-8 flex justify-between items-center  cursor-pointer transition-colors ${
              activeReportTitle === report.title
                ? "bg-purple-100"
                : "bg-white"
            }`}
            onClick={() => handleReportClick(report.title, true)}
          >
            <div className="flex items-center gap-2 w-full">
              <CalenderSvg className="text-purple-500 w-5 h-5" />

              <div className="flex flex-col items-start ml-2 flex-grow">
                <p className="text-sm font-semibold text-[#23007C]">
                  {report.title}
                </p>
                <p className="text-sm font-normal text-[#6B7280]">
                  {report.date}
                </p>
              </div>

              {activeReportTitle === report.title && (
                <ArrowSvg className="text-purple-500 w-4 h-4 ml-2" />
              )}
            </div>
          </Card>
        ))
      )}
    </div>
  </div>

  
  <Button
    variant="ghost"
    className="w-full flex items-center justify-center bg-gray-200 font-roboto text-[15px] font-bold cursor-pointer text-[#6750A4] mt-5"
    style={{ padding: "20px" }}
    onClick={handleLogout}
  >
    <span>Logout</span>
    <LoginSvg className="ml-2 w-4 h-4 " />
  </Button>
</div>

      </div>
    );
  };
  
  export default Sidebar;
