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

  // const handleNext = async () => {
  //   const currentQ = questions[currentQuestion];
  //   console.log("currentQ => ", currentQ);
  //   console.log("answrs => ", answers);
  //   const questionnaireResponse = localStorage.getItem(
  //     "questionnaire_response"
  //   );
  //   const questionName = currentQ.name;
  //   const currentQuestionNumber = currentQuestion + 1;

  //   const answerPayload = {
  //     MCQ: [],
  //     "File Input": [],
  //     "Text Input": [],
  //   };

  //   const answerObj = answers[currentQ.id];
  //   console.log("🧪 answerObj for current question:", answerObj);
  //   if (answerObj.hasOwnProperty("mcqOption")) {
  //     answerPayload.MCQ = answerObj.mcqOption;
  //   }
  //   if (answerObj.hasOwnProperty("texts")) {
  //     answerObj?.texts.forEach((item) => {
  //       const key = Object.keys(item)[0];
  //       const value = item[key];

  //       answerPayload["Text Input"].push({
  //         label: key,
  //         answered_text: value,
  //       });
  //     });
  //   }

  //   const payloadToSend = {
  //     questionnaire_response: questionnaireResponse,
  //     question: questionName,
  //     answer: answerPayload,
  //     next_or_pre_question_index: String(currentQuestionNumber + 1),
  //   };

  //   console.log("📤 Payload to saveAnswer API:", payloadToSend);

  //   try {
  //     const res = await dispatch(saveAnswer(payloadToSend)).unwrap();
  //     console.log("✅ Backend response:", res?.next_or_pre_question_answer);

  //     if (res?.next_or_pre_question_answer) {
  //       const preAns = res.next_or_pre_question_answer;
  //       const nextQ = questions[currentQuestionNumber];
  //       const nextId = nextQ?.id;

  //       const hasAnyData =
  //         (preAns["MCQ"] && preAns["MCQ"].length > 0) ||
  //         (preAns["Text Input"] && preAns["Text Input"].length > 0) ||
  //         (preAns["File Input"] && preAns["File Input"].length > 0);

  //       if (hasAnyData && nextId) {
  //         const formattedAnswer = {
  //           ...(preAns["Text Input"]?.length
  //             ? {
  //                 texts: preAns["Text Input"].map((item) => ({
  //                   [item.label]: item.answered_text,
  //                 })),
  //               }
  //             : {}),
  //           ...(preAns["MCQ"]?.length
  //             ? { mcqOption: preAns["MCQ"].map((item) => item.answered_option) }
  //             : {}),
  //           ...(preAns["File Input"]?.length
  //             ? { file: preAns["File Input"][0] }
  //             : {}),
  //         };

  //         setAnswers((prev) => ({
  //           ...prev,
  //           [nextId]: formattedAnswer,
  //         }));
  //       }
  //     }

  //     if (currentQuestionNumber < questions.length) {
  //       setCurrentQuestion(currentQuestionNumber);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error saving answer:", error);
  //   }
  // };

  // const handlePrev = async () => {
  //   // Pehle check karo ki kya hum first question se aage hain
  //   if (currentQuestion > 0) {
  //     // Current question ka data nikalo
  //     const currentQ = questions[currentQuestion];
  //     console.log("currentQ (before going back) => ", currentQ);
  //     console.log("answers (before going back) => ", answers);

  //     // Local storage se questionnaire_response nikalo
  //     const questionnaireResponse = localStorage.getItem(
  //       "questionnaire_response"
  //     );
  //     const questionName = currentQ.name;
  //     // Previous question number calculate karo
  //     const previousQuestionNumber = currentQuestion - 1;

  //     // Answer payload initialize karo, bilkul handleNext ki tarah
  //     const answerPayload = {
  //       MCQ: [],
  //       "File Input": [],
  //       "Text Input": [],
  //     };

  //     const answerObj = answers[currentQ.id];
  //     console.log("🧪 answerObj for current question (before going back):", answerObj);

  //     if (answerObj && answerObj.hasOwnProperty("mcqOption")) {
  //       answerPayload.MCQ = answerObj.mcqOption;
  //     }

  //     if (answerObj && answerObj.hasOwnProperty("texts")) {
  //       answerObj.texts.forEach((item) => {
  //         const key = Object.keys(item)[0];
  //         const value = item[key];

  //         answerPayload["Text Input"].push({
  //           label: key,
  //           answered_text: value,
  //         });
  //       });
  //     }

  //     if (answerObj && answerObj.hasOwnProperty("file")) {
  //       answerPayload["File Input"].push(answerObj.file);
  //     }

  //     const payloadToSend = {
  //       questionnaire_response: questionnaireResponse,
  //       question: questionName,
  //       answer: answerPayload,
  //       next_or_pre_question_index: String(previousQuestionNumber + 1),
  //     };

  //     console.log("📤 Payload to saveAnswer API (when going back):", payloadToSend);

  //     try {

  //       const res = await dispatch(saveAnswer(payloadToSend)).unwrap();
  //       console.log("✅ Backend response (when going back):", res?.next_or_pre_question_answer);

  //       if (res?.next_or_pre_question_answer) {
  //         const preAns = res.next_or_pre_question_answer;
  //         const prevQ = questions[previousQuestionNumber];
  //         const prevId = prevQ?.id;

  //         const hasAnyData =
  //           (preAns["MCQ"] && preAns["MCQ"].length > 0) ||
  //           (preAns["Text Input"] && preAns["Text Input"].length > 0) ||
  //           (preAns["File Input"] && preAns["File Input"].length > 0);

  //         if (hasAnyData && prevId) {

  //           const formattedAnswer = {
  //             ...(preAns["Text Input"]?.length
  //               ? {
  //                   texts: preAns["Text Input"].map((item) => ({
  //                     [item.label]: item.answered_text,
  //                   })),
  //                 }
  //               : {}),
  //             ...(preAns["MCQ"]?.length
  //               ? { mcqOption: preAns["MCQ"].map((item) => item.answered_option) }
  //               : {}),
  //             ...(preAns["File Input"]?.length
  //               ? { file: preAns["File Input"][0] }
  //               : {}),
  //           };

  //           setAnswers((prev) => ({
  //             ...prev,
  //             [prevId]: formattedAnswer,
  //           }));
  //         }
  //       }

  //       // Ab previous question par navigate karo
  //       setCurrentQuestion(previousQuestionNumber);
  //     } catch (error) {
  //       console.error("❌ Error saving answer when going back:", error);
  //       // Error ke baad bhi previous question par navigate karo
  //       setCurrentQuestion(previousQuestionNumber);
  //     }
  //   }
  // };

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
    // Save to local state for UI feedback
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [option]: file,
      },
    }));
    console.log("answers before file uploa => ", answers);

    // Upload to backend
    dispatch(uploadFile(file))
      .unwrap()
      .then((fileData) => {
        console.log("✅ File uploaded:", fileData);
        // Optional: You could also save the file URL or metadata in answers state if needed
        console.log("answers before setAnswer callling => ", answers);
        setAnswers((prev) => {
          const existing = prev[questionId] || {};
          const existingFiles = existing.file || [];

          // Remove old entry for this label
          const filtered = existingFiles.filter(
            (item) => item.label !== option
          );

          return {
            ...prev,
            [questionId]: {
              ...existing,
              file: [
                ...filtered,
                {
                  label: option,
                  answered_file: fileData.file_url,
                  file_name: fileData.name,
                },
              ],
            },
          };
        });
        console.log("answers after file uploa => ", answers);
      })
      .catch((err) => {
        console.error("❌ File upload failed:", err);
        // Optional: show toast or error UI
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
