import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";

const SubmissionSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white-100">
      <div className="bg-white p-10 md:p-16 text-center">
        {/* Large Check Icon */}
        <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />

        {/* Submitted Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
          Submitted
        </h1>

        {/* Button */}
        <Button
          onClick={() => navigate("/")}
          className="bg-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-purple-700 transition-all"
        >
          Back to reports →
        </Button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
