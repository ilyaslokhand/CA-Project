import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import SurveyQuestion from "@/Componts/SurveyQuestion";
import StepProgress from "@/Componts/StepProgress";
import { fetchQuestions, resetQuestions } from "@/Redux/Question/questionSlice";

const Survey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Location state:", location.state);

  const dispatch = useDispatch();

  const questionnaireName = location.state?.questionnaireName;

  const { questions, loading, error } = useSelector((state) => state.questions);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (questionnaireName) {
      dispatch(fetchQuestions(questionnaireName));
    }
    return () => {
      dispatch(resetQuestions());
    };
  }, [dispatch, questionnaireName]);

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

  const handleSelectAnswer = (value, questionId, isMulti) => {
    setAnswers((prev) => {
      if (isMulti) {
        const currentArray = Array.isArray(prev[questionId])
          ? prev[questionId]
          : [];

        const updated = currentArray.includes(value)
          ? currentArray.filter((v) => v !== value)
          : [...currentArray, value];

        return {
          ...prev,
          [questionId]: updated,
        };
      }

      // For single-select, store as object
      return {
        ...prev,
        [questionId]: {
          selectedOption: value,
        },
      };
    });
  };

  const handleInputChange = (field, value, questionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [field]: value,
      },
    }));
  };

  const handleFileUpload = (option, file, questionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [option]: file,
      },
    }));
  };

  const currentQ = questions[currentQuestion] ?? {};

  const handleEndSurvey = () => {
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

  if (loading) return <p className="text-center mt-6">Loading questions...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!questionnaireName || questions.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-500">No questions available.</p>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl min-h-[60px] mb-6">
        <StepProgress
          questions={questions}
          currentStep={currentQuestion + 1}
          totalSteps={questions.length}
          answers={answers}
        />
      </div>

      <div className="p-6 w-full max-w-3xl min-h-[300px]">
        <p className="text-gray-500 text-sm mb-4">
          Question {currentQuestion + 1}
        </p>
        <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

        <SurveyQuestion
          question={currentQ}
          onSelect={handleSelectAnswer}
          onInputChange={handleInputChange}
          onFileUpload={handleFileUpload}
          answers={answers}
        />
      </div>

      <div className="flex justify-between w-full max-w-3xl mt-6">
        <Button
          variant={Ghost}
          onClick={handlePrev}
          className="bg-[#D3D6DC] text-black"
          disabled={currentQuestion === 0}
        >
          Prev
        </Button>

        {currentQuestion === questions.length - 1 ? (
          <Button onClick={handleEndSurvey} className="bg-[#A855F7] text-white">
            End Survey
          </Button>
        ) : (
          <Button
            variant={Ghost}
            onClick={handleNext}
            className="bg-[#A855F7] text-white"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Survey;
