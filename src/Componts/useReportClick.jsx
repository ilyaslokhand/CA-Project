import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveFirstQuestionAnswer } from "@/Redux/Question/saveFirstQuestionAnswer";

const useReportClick = (setIsStarting) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));

  const handleReportClick = async (reportName, replace=false) => {
    setIsStarting?.(true);

    const res = await dispatch(
      saveFirstQuestionAnswer({
        questionnaire: reportName,
        client: user?.email,
      })
    );

    const data = res.payload?.first_question_answer || {};

    const formattedAnswer = {
      ...(data["Text Input"]?.length
        ? {
            texts: data["Text Input"].map((item) => ({
              [item.label]: item.answered_text,
            })),
          }
        : {}),
      ...(data["MCQ"]?.length
        ? {
            mcqOption: data["MCQ"].map((item) => item.answered_option),
          }
        : {}),
      ...(data["File Input"]?.length ? { files: data["File Input"] } : {}),
    };

    console.log("formatted ans => ", formattedAnswer);

    setIsStarting?.(false);

    navigate("/survey", {
      state: {
        questionnaireName: reportName,
        prefillAnswer: formattedAnswer,
      },
      replace, // This is correct!
    });
    
  };

  return handleReportClick;
};

export default useReportClick;