import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalenderSvg from "@/utility/Svg/CalenderSvg";
import { fetchReports } from "@/Redux/getReports/reportSlice";
import { saveFirstQuestionAnswer } from "@/Redux/Question/saveFirstQuestionAnswer";

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

  const {
    reports: apiData,
    loading,
    error,
  } = useSelector((state) => state.report);

  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchReports(user.email));
    }
  }, [dispatch, user?.email]);

  const reports =
    apiData?.data?.map((item) => {
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
        reports.map((report, index) => (
          <div
            key={index}
            onClick={async () => {
              setIsStarting(true);
              const res = await dispatch(
                saveFirstQuestionAnswer({
                  questionnaire: report.questionnaire_name,
                  client: user?.email,
                })
              );

              const data = res.payload?.first_question_answer || {};

              const formattedAnswer = {
                ...(data["Text Input"]?.length
                  ? {
                      texts: data["Text Input"].map((item) => ({
                        [item.label]: item.answered_text,
                      })),
                    }
                  : {}),
                ...(data["MCQ"]?.length
                  ? { selectedOption: data["MCQ"][0].answered_option }
                  : {}),
                ...(data["File Input"]?.length
                  ? { file: data["File Input"][0] }
                  : {}),
              };

              setIsStarting(false);

              navigate("/survey", {
                state: {
                  questionnaireName: report.questionnaire_name,
                  prefillAnswer: formattedAnswer, // Pass prefilled answer
                },
              });
            }}
            className="flex items-center justify-between w-full max-w-[848px] h-[98px] px-4 py-3 border rounded-lg shadow-sm bg-white cursor-pointer"
          >
            <div className="flex">
              <div className="flex items-center gap-3">
                <div className="cursor-pointer">
                  <CalenderSvg />
                </div>
                <div>
                  <p className="text-[14px] font-[500]">{report.title}</p>
                  <p className="text-[14px] text-gray-500">{report.date}</p>
                </div>
              </div>
              {report.submitted && (
                <span className="text-[#16A34A] bg-[#DCFCE7] text-sm font-medium px-2 h-5 flex items-center ml-4">
                  Submitted
                </span>
              )}
            </div>

            <div className="flex items-center gap-[7px]">
              <span
                className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-semibold ${report.color}`}
              >
                {report.progress}
              </span>
              <Button
                className="text-[14px] font-[500] h-5 p-0 w-[49px] rounded-none"
                style={{
                  background: report.bg,
                  color: report.clr,
                }}
              >
                {report.status}
              </Button>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportList;
