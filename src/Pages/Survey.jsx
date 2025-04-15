import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import SurveyQuestion from "@/Componts/SurveyQuestion";
import StepProgress from "@/Componts/StepProgress";
import { fetchQuestions, resetQuestions } from "@/Redux/Question/questionSlice";
import { Ghost } from "lucide-react";
import saveCurrentAnswerAndGetNext from "@/Componts/saveCurrentAnswerAndGetNext ";
import { uploadFile } from "@/Redux/Question/uploadSlice";

const Survey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const questionnaireName = location.state?.questionnaireName;
  const prefillAnswer = location.state?.prefillAnswer;

  const { questions, loading, error } = useSelector((state) => state.questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  useEffect(() => {
    console.log("📦 Updated answers:", answers);
  }, [answers]);

  useEffect(() => {
    if (questionnaireName) {
      dispatch(fetchQuestions(questionnaireName));
    }
    return () => {
      dispatch(resetQuestions());
    };
  }, [dispatch, questionnaireName]);

  useEffect(() => {
    if (prefillAnswer && questions.length > 0) {
      const firstQ = questions[0];
      const id = firstQ.id;

      setAnswers((prev) => ({
        ...prev,
        [id]: prefillAnswer,
      }));
    }
  }, [prefillAnswer, questions]);

  const handleNext = async () => {
    const currentQuestionNumber = currentQuestion + 1;

    const success = await saveCurrentAnswerAndGetNext({
      currentQuestion,
      questions,
      answers,
      nextIndexToSet: currentQuestionNumber,
      nextOrPrevIndexForBackend: currentQuestionNumber + 1,
      dispatch,
      setAnswers,
    });

    if (success && currentQuestionNumber < questions.length) {
      setCurrentQuestion(currentQuestionNumber);
    }
  };

  const handlePrev = async () => {
    if (currentQuestion > 0) {
      const previousQuestionNumber = currentQuestion - 1;

      await saveCurrentAnswerAndGetNext({
        currentQuestion,
        questions,
        answers,
        nextIndexToSet: previousQuestionNumber,
        nextOrPrevIndexForBackend: previousQuestionNumber + 1,
        dispatch,
        setAnswers,
      });

      setCurrentQuestion(previousQuestionNumber); // Always go back
    }
  };

  const handleSelectAnswer = (value, questionId, isMulti) => {
    setAnswers((prev) => {
      const currentArray = Array.isArray(prev[questionId]?.mcqOption)
        ? prev[questionId].mcqOption
        : [];

      let updated = [];

      if (isMulti) {
        // Toggle value in array
        updated = currentArray.includes(value)
          ? currentArray.filter((v) => v !== value)
          : [...currentArray, value];
      } else {
        // Single select — replace array with only one value
        updated = [value];
      }

      return {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          mcqOption: updated,
        },
      };
    });
  };

  const handleFileRemove = (field, questionId) => {
    setAnswers((prev) => {
      const updated = { ...prev[questionId] };
      delete updated[field];
      return {
        ...prev,
        [questionId]: updated,
      };
    });
  };

  const handleInputChange = (field, value, questionId, index) => {
    setAnswers((prev) => {
      const prevTexts = prev[questionId]?.texts || [];
      const newTexts = [...prevTexts];
      if (!newTexts[index]) {
        newTexts[index] = {};
      }
      newTexts[index][field] = value;
      return {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          texts: newTexts,
        },
      };
    });
  };

  const handleFileUpload = (option, file, questionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [option]: file,
      },
    }));

    // Upload to backend
    dispatch(uploadFile(file))
      .unwrap()
      .then((fileData) => {
        setAnswers((prev) => {
          const currentQuestionData = prev[questionId] || {}
          const currentFiles = currentQuestionData.files || []

          return {
            ...prev,
            [questionId]: {
              ...currentQuestionData,
              files: [
                ...currentFiles,
                {
                  label: option,
                  answered_file: fileData.file_url,
                  file_name: fileData.name,
                }
              ],
            },
          }
        });
      })
      .catch((err) => {
        console.error("❌ File upload failed:", err);
      });
  };

  const currentQ = questions[currentQuestion] ?? {};

  const handleEndSurvey = async () => {
    const currentQuestionNumber = currentQuestion + 1;

    const success = await saveCurrentAnswerAndGetNext({
      currentQuestion,
      questions,
      answers,
      nextIndexToSet: currentQuestionNumber,
      nextOrPrevIndexForBackend: "",
      dispatch,
      setAnswers,
    });

    if (success) {
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
    }
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
          onFileRemove={handleFileRemove}
        />
      </div>

      <div className="flex justify-between w-full max-w-3xl mt-6">
        <Button
          onClick={handlePrev}
          className="bg-[#D3D6DC] text-black hover:bg-[#D3D6DC] hover:text-inherit"
          disabled={currentQuestion === 0}
        >
          Prev
        </Button>

        {currentQuestion === questions.length - 1 ? (
          <Button
            varient={Ghost}
            onClick={handleEndSurvey}
            className="bg-[#A855F7] text-white hover:bg-[#A855F7] "
          >
            End Survey
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-[#A855F7] text-white hover:bg-[#A855F7] hover:text-white"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Survey;
