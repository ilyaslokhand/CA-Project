import React from "react";
import { Calendar, ArrowRightIcon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalenderSvg from "@/utility/Svg/CalenderSvg";

const reports = [
  {
    title: "Annual Report 2024",
    date: "14 March, 2024",
    progress: "0%",
    status: "Start",
    bg: "rgba(254, 226, 226, 0.28)",
    clr: "#DC2626",
    color: "bg-red-100 text-red-600",
    color1: "text-red-600",
  },
  {
    title: "Q4 Report 2024",
    date: "21 Feb, 2024",
    progress: "65%",
    status: "Edit",
    bg: "rgba(254, 249, 195, 0.28)",
    clr: "#CA8A04",
    color: "bg-yellow-100 text-yellow-600",
    color1: "text-yellow-600",
  },
  {
    title: "Q3 Report 2024",
    date: "15 Oct, 2024",
    progress: "75%",
    status: "Edit",
    bg: "rgba(254, 249, 195, 0.28)",
    clr: "#CA8A04",
    color: "bg-yellow-100 text-yellow-600",
    color1: "text-yellow-600",
  },
  {
    title: "Q2 Report 2024",
    date: "10 Aug, 2024",
    progress: "90%",
    status: "Edit",
    bg: "rgba(254, 249, 195, 0.28)",
    clr: "#CA8A04",
    color: "bg-yellow-100 text-yellow-600",
    color1: "text-yellow-600",
  },
  {
    title: "Q1 Report 2024",
    date: "18 Feb, 2024",
    progress: "100%",
    status: "View",
    bg: "rgba(220, 252, 231, 0.28)",
    clr: "#16A34A",
    color: "bg-green-100 text-green-600",
    color1: "text-green-600",
    submitted: true,
  },
];

const ReportList = () => {
  return (
    <div className="p-4 mt-4 bg-white flex flex-col gap-4 items-center">
      {reports.map((report, index) => (
        <div
          key={index}
          className="flex items-center justify-between w-full max-w-[848px] h-[98px] px-4 py-3 border rounded-lg shadow-sm bg-gray-50"
        >
          {/* Left Section */}
          <div flex className="flex">
            <div className="flex items-center gap-3">
              <div
                className="cursor-pointer
"
              >
                <CalenderSvg />
              </div>
              <div>
                <p className=" text-[14px] font-[500] leading-[20px] m-0">
                  {report.title}
                </p>
                <div className="flex items-center gap-2">
                  <p
                    className="text-[14px] font-[400] leading-[20px]"
                    style={{ color: "#6B7280" }}
                  >
                    {report.date}
                  </p>
                </div>
              </div>
            </div>
            {report.submitted && (
              <span
                className="text-green-600 text-[14px] font-[500] leading-[20px] bg-green-100 px-2 h-5 flex items-center ml-[17px] "
                style={{ background: "#DCFCE7", color: "#16A34A" }}
              >
                Submitted
              </span>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-[7px]">
            <span
              className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-semibold ${report.color}`}
            >
              {report.progress}
            </span>

            <Button
              // variant="ghost"
              className={`text-[14px] font-[500] flex items-center gap-1 h-5 p-0 w-[49px] rounded-[0px] `}
              style={{
                background: report.bg,
                color: report.clr,
              }}
            >
              {report.status}
            </Button>

            <ChevronRight className=" text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
