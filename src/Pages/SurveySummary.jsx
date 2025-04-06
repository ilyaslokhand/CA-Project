import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SurveySummary = () => {
  const navigate = useNavigate();

  const onsubmit = () => {
    navigate("/sucess");
  };

  const location = useLocation();
  const {
    totalQuestions = 0,
    answered = 0,
    skipped = 0,
  } = location.state || {};

  const answeredPercentage = ((answered / totalQuestions) * 100).toFixed(0);
  const skippedPercentage = ((skipped / totalQuestions) * 100).toFixed(0);

  return (
    <div className="min-h-screen w-full flex items-center justify-center  p-4">
      <div className="flex flex-col items-center p-8 w-full ">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>

        {/* Total Questions */}
        <div className="w-full mb-4">
          <p className="text-sm text-gray-700">Total Questions</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div className="bg-[#3578FF] h-2.5 rounded-full w-full"></div>
          </div>
          <p className="text-sm font-bold">{totalQuestions}</p>
        </div>

        {/* Answered */}
        <div className="w-full mb-4">
          <p className="text-sm text-gray-700">Answered</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div
              className="bg-[#FF7B0A] h-2.5 rounded-full"
              style={{ width: `${answeredPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-bold">{answered}</p>
            <p className="text-gray-500">{answeredPercentage}%</p>
          </div>
        </div>

        {/* Skipped */}
        <div className="w-full mb-6">
          <p className="text-sm text-gray-700">Skipped</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div
              className="bg-[#FFCB01] h-2.5 rounded-full"
              style={{ width: `${skippedPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-bold">{skipped}</p>
            <p className="text-gray-500">{skippedPercentage}%</p>
          </div>
        </div>

        <p className="font-semibold text-lg mb-4 text-center">
          Are you sure you want to submit?
        </p>
        <Button
          onClick={() => onsubmit()}
          variant={Ghost}
          className="bg-[#6750A4] text-white py-2 px-6 rounded-full cursor-pointer"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SurveySummary;
