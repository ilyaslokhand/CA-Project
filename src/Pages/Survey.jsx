import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import SurveyQuestion from "@/Componts/SurveyQuestion";
import { useNavigate } from "react-router-dom";
import StepProgress from "@/Componts/StepProgress";

const questions = [
  {
    id: 1,
    type: "single-choice",
    question: "What was the company's total revenue growth in 2024?",
    options: [
      { label: "30% year-over-year increase", value: "30-1" },
      { label: "30% year-over-year increase", value: "30-2" },
      { label: "20% year-over-year increase", value: "20" },
      { label: "30% year-over-year increase", value: "30-3" },
    ],
  },
  {
    id: 2,
    type: "text-input",
    question: "Provide company details",
    fields: ["Company Intro", "Client Name"],
  },
  {
    id: 3,
    type: "file-upload",
    question: "What was the Identity Proof You have? (Upload any one)",
    options: ["AadharCard.pdf", "Driving Licenses", "Pan Card"],
  },
];

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const navigate = useNavigate();

  const handleRadioChange = (option) => {
    setSelectedOption(option); // Store selected answer
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));
    setSelectedOption((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }));
  };

  const handleInputChange = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (option, file) => {
    setAnswers((prev) => ({
      ...prev,
      [`${questions[currentQuestion].id}-${option}`]: file, // Unique key for each option
    }));
  };

  const currentQ = questions[currentQuestion] ?? {};

  const handleendsurvey = () => {
    const totalQuestions = questions.length;
    const answered = Object.keys(answers).length;
    const skipped = totalQuestions - answered;

    navigate("/summary", {
      state: {
        totalQuestions,
        answered,
        skipped,
        answers,
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center  px-4 py-8">
      {/* Timeline Section */}
      <div className="w-full max-w-3xl min-h-[60px] mb-6">
        <StepProgress
          questions={questions}
          currentStep={currentQuestion + 1}
          totalSteps={questions.length}
          answers={answers}
        />
      </div>

      <div className=" p-6   w-full max-w-3xl min-h-[300px]">
        <p className="text-gray-500 text-sm mb-4">
          Question {currentQuestion + 1}
        </p>
        <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

        <SurveyQuestion
          question={currentQ}
          onSelect={handleSelectAnswer}
          onInputChange={handleInputChange}
          onFileUpload={handleFileUpload}
          selectedOption={answers[currentQ.id] || ""}
          answers={answers}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-3xl mt-6">
        <Button
          variant={Ghost}
          onClick={handlePrev}
          className="bg-[#D3D6DC] text-black cursor-pointer"
          disabled={currentQuestion === 0}
        >
          Prev
        </Button>

        {currentQuestion === questions.length - 1 ? (
          <Button
            variant={Ghost}
            onClick={handleendsurvey}
            className="bg-[#A855F7] text-white cursor-pointer"
          >
            End Survey
          </Button>
        ) : (
          <Button
            variant={Ghost}
            onClick={handleNext}
            className="bg-[#A855F7] text-white cursor-pointer"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Survey;
