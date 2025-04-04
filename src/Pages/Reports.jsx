import React from "react";
import { ArrowRight, ArrowRightIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  {
    title: "Annual Report 2024",
    date: "14 March, 2024",
    progress: "0%",
    status: "Start",
    color: "bg-red-100 text-red-600",
    color1: "text-red-600",
  },
  {
    title: "Q4 Report 2024",
    date: "21 Feb, 2024",
    progress: "65%",
    status: "Edit",
    color: "bg-yellow-100 text-yellow-600",
    color1: "text-yellow-600",
  },
  {
    title: "Q3 Report 2024",
    date: "15 Oct, 2024",
    progress: "75%",
    status: "Edit",
    color: "bg-yellow-100 text-yellow-600",
    color1: "text-yellow-600",
  },
  {
    title: "Q2 Report 2024",
    date: "10 Aug, 2024",
    progress: "90%",
    status: "Edit",
    color: "bg-yellow-100 text-yellow-600",
    color1: "text-yellow-600",
  },
  {
    title: "Q1 Report 2024",
    date: "18 Feb, 2024",
    progress: "100%",
    status: "View",
    color: "bg-green-100 text-green-600",
    color1: "text-green-600",
  },
];

const ReportList = () => {
  return (
    <div className="p-4 mt-4 bg-white">
      {reports.map((report, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-gray-50 mb-4 last:mb-0"
        >
          <div className="flex items-center space-x-3">
            <Calendar className="text-[#DC76E5]" />
            <div>
              <p className="font-semibold">{report.title}</p>
              <p className="text-gray-500 text-sm">{report.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold ${report.color}`}
            >
              {report.progress}
            </span>
            <Button
              variant="ghost"
              className={`text-sm font-semibold  flex items-center ${report.color1} gap-1 cursor-pointer`}
            >
              {report.status}{" "}
              <ArrowRightIcon className="text-gray-400 w-4 h-4 cursor-pointer" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
