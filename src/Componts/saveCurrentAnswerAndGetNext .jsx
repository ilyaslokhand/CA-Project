import { saveAnswer } from "@/Redux/Answer/saveAnswerSlice";

const saveCurrentAnswerAndGetNext = async ({
  currentQuestion,
  questions,
  answers,
  nextIndexToSet,
  nextOrPrevIndexForBackend,
  dispatch,
  setAnswers,
}) => {
  const currentQ = questions[currentQuestion];
  const answerObj = answers[currentQ.id];
  const questionnaireResponse = localStorage.getItem("questionnaire_response");

  const answerPayload = {
    MCQ: [],
    "File Input": [],
    "Text Input": [],
  };

  // For storing MCQ data in answers.
  if (answerObj?.mcqOption) {
    answerPayload.MCQ = answerObj.mcqOption;
  }
  // For storing Text Input data in answers.
  if (answerObj?.texts) {
    answerObj.texts.forEach((item) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      answerPayload["Text Input"].push({
        label: key,
        answered_text: value,
      });
    });
  }
  // For storing MCQ data in answers.
  if (answerObj?.files) {
    answerPayload["File Input"] = answerObj?.files;
  }

  const payloadToSend = {
    questionnaire_response: questionnaireResponse,
    question: currentQ.name,
    answer: answerPayload,
    next_or_pre_question_index: String(nextOrPrevIndexForBackend),
  };
  console.log('payloadToSend => ', payloadToSend);

  try {
    const res = await dispatch(saveAnswer(payloadToSend)).unwrap();
    console.log('res.next_or_pre_question_answer => ', res);

    if (res?.next_or_pre_question_answer) {
      const preAns = res.next_or_pre_question_answer;
      const nextQ = questions[nextIndexToSet];
      const nextId = nextQ?.id;

      const hasAnyData =
        preAns["MCQ"]?.length > 0 ||
        preAns["Text Input"]?.length > 0 ||
        preAns["File Input"]?.length > 0;

      if (hasAnyData && nextId) {
        const formattedAnswer = {
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
            ? { file: preAns["File Input"][0] }
            : {}),
        };

        setAnswers((prev) => ({
          ...prev,
          [nextId]: formattedAnswer,
        }));
      }
    }

    return true;
  } catch (err) {
    console.error("❌ Error saving answer:", err);
    return false;
  }
};

export default saveCurrentAnswerAndGetNext;
