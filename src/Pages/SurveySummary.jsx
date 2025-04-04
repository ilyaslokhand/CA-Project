import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";

const SurveySummary = () => {
  const location = useLocation();
  const {
    totalQuestions = 0,
    answered = 0,
    skipped = 0,
  } = location.state || {};

  const answeredPercentage = ((answered / totalQuestions) * 100).toFixed(0);
  const skippedPercentage = ((skipped / totalQuestions) * 100).toFixed(0);

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>

      {/* Total Questions */}
      <div className="w-full max-w-md mb-4">
        <p className="text-sm text-gray-700">Total Questions</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
          <div className="bg-blue-500 h-2.5 rounded-full w-full"></div>
        </div>
        <p className="text-sm font-bold">{totalQuestions}</p>
      </div>

      <div className="w-full max-w-md mb-4">
        <p className="text-sm text-gray-700">answered</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
          <div
            className="bg-orange-500 h-2.5 rounded-full"
            style={{ width: `${answeredPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-bold">{answered}</p>
          <p className="text-gray-500">{answeredPercentage}%</p>
        </div>
      </div>
      <div className="w-full max-w-md mb-6">
        <p className="text-sm text-gray-700">skipped</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
          <div
            className="bg-gray-500 h-2.5 rounded-full"
            style={{ width: `${skippedPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-bold">{skipped}</p>
          <p className="text-gray-500">{skippedPercentage}%</p>
        </div>
      </div>
      <p className="font-semibold text-lg mb-4">
        Are you sure you want to submit?
      </p>
      <Button
        variant={Ghost}
        className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700"
      >
        Submit
      </Button>
    </div>
  );
};

export default SurveySummary;
