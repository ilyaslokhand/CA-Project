import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalenderSvg from "@/utility/Svg/CalenderSvg";
import { fetchReports } from "@/Redux/getReports/reportSlice";
import useReportClick from "@/Componts/useReportClick";

const getReportStyles = (percentage, status) => {
  if (status === "Submitted") {
    return {
      bg: "rgba(220, 252, 231, 0.28)",
      clr: "#16A34A",
      color: "bg-green-100 text-green-600",
      color1: "text-green-600",
      status: "View",
      submitted: true,
    };
  } else if (percentage > 0) {
    return {
      bg: "rgba(254, 249, 195, 0.28)",
      clr: "#CA8A04",
      color: "bg-yellow-100 text-yellow-600",
      color1: "text-yellow-600",
      status: "Edit",
    };
  } else {
    return {
      bg: "rgba(254, 226, 226, 0.28)",
      clr: "#DC2626",
      color: "bg-red-100 text-red-600",
      color1: "text-red-600",
      status: "Start",
    };
  }
};

const ReportList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  const handleReportClick = useReportClick(setIsStarting);


  const {
    reports, // directly the array
    loading,
    error,
  } = useSelector((state) => state.report);

  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));

  const isLoggingOut = useSelector(
    (state) => state.logout.loading || state.logout.success
  );

  useEffect(() => {
    if (isLoggingOut || !user?.email) {
      return;
    }
    const userEmail = user?.email;
    if (userEmail) {
      dispatch(fetchReports(userEmail));
    }
  }, [dispatch, user?.email, isLoggingOut]);

  const reportCards  =
  
  reports.map((item) => {
    
      const styles = getReportStyles(item.progress_percentage, item.status);
      return {
        title: item.name,
        questionnaire_name: item.name,
        date: new Date(item.assigned_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        progress: `${item.progress_percentage}%`,
        ...styles,
      };
    }) || [];


  return (
    <div className="p-4 mt-4 flex flex-col gap-4 items-center">
      {loading ? (
        <p>Loading reports...</p>
      ) : error ? (
        <p className="text-red-500">
          Error: {error?.message || "Something went wrong"}
        </p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reportCards.map((report, index) => (
          <div
            key={index}
            onClick={() => handleReportClick(report.questionnaire_name)}
            className="flex flex-col md:flex-row md:items-center justify-between w-full max-w-[848px] p-4 border rounded-lg shadow-sm bg-white cursor-pointer gap-2 md:gap-0 md:h-[98px]"
            >
             {/* Left Side */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <div className="flex items-center gap-3">
            <div className="cursor-pointer">
              <CalenderSvg />
            </div>
            <div class="flex justify-between md:block w-full">
            <p class="text-[14px] font-[500]">{report.title}</p>
  <p class="text-[14px] text-gray-500">{report.date}</p>
</div>

          </div>
          {report.submitted && (
            <span className="text-[#16A34A] bg-[#DCFCE7] text-sm font-medium px-2 h-5 flex items-center w-max rounded">
              Submitted
            </span>
          )}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-[9px] mt-2 md:mt-0">
        <span
          className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-semibold ${report.color}`}>
           {report.progress}
             </span>
           <Button className="text-[14px] font-[500] h-5 p-0 w-[49px] rounded-none flex items-center gap-2 cursor-pointer"
          style={{
           background: report.bg,
           color: report.clr,
           }}>
           <span >{report.status}</span>
          <ChevronRight className="text-[#9CA3AF] w-[8px] h-[14px] " />
          </Button>
          </div>
          </div>
    ))
  )}
</div>
  )
};

export default ReportList;
