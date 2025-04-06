import { CircleCheck, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";

const SubmissionSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white w-full px-4">
      <div className="text-center">
        {/* Large Check Icon */}
        <CircleCheck className="text-[#14D93C] w-24 h-24 mx-auto mb-6" />

        {/* Submitted Text */}
        <h1 className="text-4xl font-bold text-[#14D93C] mb-6">Submitted</h1>

        {/* Button */}
        <Button
          variant={Ghost}
          onClick={() => navigate("/")}
          className="bg-[#ECE6F0] text-white px-8 py-4 text-lg md:text-xl font-semibold rounded-lg shadow transition-all cursor-pointer"
          style={{ padding: "30px" }}
        >
          <span className="text-[#6750A4]">Back to reports →</span>
        </Button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
