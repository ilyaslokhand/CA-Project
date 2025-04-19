import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost } from "lucide-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionnaireSummary } from "@/Redux/Summery/fetchQuestionnaireSummary";
// import saveCurrentAnswerAndGetNext from "@/Componts/saveCurrentAnswerAndGetNext ";
import { saveAnswer } from "@/Redux/Answer/saveAnswerSlice";

const SurveySummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    answers,
    questions,
    // currentQuestion,
  } = location.state || {};
  const lastQuestionIndex = questions?.length - 1;

  const onsubmit = () => {
    navigate("/sucess");
  };

  const { error, loading, summary } = useSelector((state) => state.summary);

  const questionnaire_response = localStorage.getItem("questionnaire_response");

  // ✅ Trigger API on page load
  useEffect(() => {
    if (questionnaire_response) {
      dispatch(fetchQuestionnaireSummary(questionnaire_response));
    }
  }, [dispatch, questionnaire_response]);

  const totalQuestions = summary?.total_questions || 0;
  const answered = summary?.attended_questions || 0;
  const skipped = summary?.skipped_questions || 0;

  const answeredPercentage = totalQuestions
    ? ((answered / totalQuestions) * 100).toFixed(0)
    : 0;

  const skippedPercentage = totalQuestions
    ? ((skipped / totalQuestions) * 100).toFixed(0)
    : 0;

  const handleBack = async () => {
    const lastQuestion = questions[lastQuestionIndex];
  
    // const success = await saveCurrentAnswerAndGetNext({
    //   currentQuestion: lastQuestionIndex,
    //   questions,
    //   answers,
    //   nextIndexToSet: lastQuestionIndex,
    //   nextOrPrevIndexForBackend: lastQuestionIndex + 1,
    //   dispatch,
    //   setAnswers: () => {}, // no need to update locally here
    // });

    const questionnaireResponse = localStorage.getItem("questionnaire_response");
    const questionnaireName = questionnaireResponse.split('-');
  
    const answerPayload = {
      MCQ: [],
      "File Input": [],
      "Text Input": [],
    };
  
    const payloadToSend = {
      questionnaire_response: questionnaireResponse,
      question: "",
      answer: answerPayload,
      next_or_pre_question_index: String(lastQuestionIndex + 1),
    };
  
    try {
      const res = await dispatch(saveAnswer(payloadToSend)).unwrap();
  
      let formattedAnswer = '';
      if (res?.next_or_pre_question_answer) {
        const preAns = res.next_or_pre_question_answer;
        const nextQ = questions[lastQuestionIndex];
        const nextId = nextQ?.id;
  
        const hasAnyData =
          preAns["MCQ"]?.length > 0 ||
          preAns["Text Input"]?.length > 0 ||
          preAns["File Input"]?.length > 0;
  
        if (hasAnyData && nextId) {
          formattedAnswer = {
            ...(preAns["Text Input"]?.length
              ? {
                  texts: preAns["Text Input"].map((item) => ({
                    [item.label]: item.answered_text,
                  })),
                }
              : {}),
            ...(preAns["MCQ"]?.length
              ? { mcqOption: preAns["MCQ"].map((item) => item.answered_option) }
              : {}),
            ...(preAns["File Input"]?.length
              ? { files: preAns["File Input"] }
              : {}),
          };
        }
      }
  
      navigate("/survey", {
        state: {
          goToIndex: lastQuestionIndex,
          prefillAnswer: formattedAnswer,
          questionnaireName: questionnaireName[0],
        },
      });
    } catch (err) {
      console.error("❌ Error saving answer:", err);
      return false;
    }
  
    // if (success) {
    //   navigate("/survey", {
    //     state: {
    //       goToIndex: lastQuestionIndex,
    //       prefillAnswer: answers[lastQuestion?.id] || "",
    //       questionnaireName: questions[0]?.questionnaire_name,
    //     },
    //   });
    // }
  };

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>Error loading summary: {error}</p>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
      <div
        className="absolute top-4 left-4 cursor-pointer flex items-center gap-1"
        onClick={handleBack}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-sm font-medium">Back</span>
      </div>

      <div className="flex flex-col items-center p-8 w-full">
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
            {/* <p className="text-gray-500">{answeredPercentage}%</p> */}
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
            {/* <p className="text-gray-500">{skippedPercentage}%</p> */}
          </div>
        </div>

        <p className="font-semibold text-lg mb-4 text-center">
          Are you sure you want to submit?
        </p>
        <Button
          onClick={onsubmit}
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
