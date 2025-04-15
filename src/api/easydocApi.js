import axios from "axios";

const BASE_URL = "https://doradoritesting.frappe.cloud/api/method";

export const LoginApi = ({ email, password }) => {
  return axios.get(`${BASE_URL}/easydoc.easydoc.api.easydoc_login.login`, {
    params: { usr: email, pwd: password },
    withCredentials: true,
  });
};

export const fetchReportsAPI = (email) => {
  return axios.get(
    `${BASE_URL}/easydoc.easydoc.doctype.questionnaire.questionnaire.get_assigned_questionnaires`,
    {
      params: { user: email },
      withCredentials: true,
    }
  );
};



export const fetchQuestionsAPI = (questionnaire) => {
  return axios.get(
    `${BASE_URL}/easydoc.easydoc.doctype.question.question.get_questionnaire_questions`,
    {
      params: { questionnaire: questionnaire },
      withCredentials: true,
    }
  );
};

export const saveFirstQuestionAnswerAPI = ({ questionnaire, client }) => {
  return axios.post(
    `${BASE_URL}/easydoc.easydoc.doctype.questionnaire_response.questionnaire_response.start_question`,
    { questionnaire, client },
    { withCredentials: true }
  );
};

export const saveAnswerAPI = (payload) => {
  // const formData = new FormData();

  // formData.append("questionnaire_response", payload.questionnaire_response);
  // formData.append("question", payload.question);
  // formData.append(
  //   "next_or_pre_question_index",
  //   payload.next_or_pre_question_index
  // );

  // formData.append("answer[MCQ]", JSON.stringify(payload.answer["MCQ"] || []));
  // formData.append(
  //   "answer[Text Input]",
  //   JSON.stringify(payload.answer["Text Input"] || [])
  // );

  // File upload nu form Data ma set karvanu baki hai.....
  // For reference only dont copy paste ILYAS.
  // Append File Inputs (file + label)
  //  (payload.answer["File Input"] || []).forEach((item, index) => {
  //   formData.append(`answer[File Input][${index}][label]`, item.label);
  //   formData.append(`answer[File Input][${index}][answered_file]`, item.answered_file);
  // });

  return axios.post(
    `${BASE_URL}/easydoc.easydoc.doctype.questionnaire_response.questionnaire_response.save_answer`,
    payload,
    { withCredentials: true }
  );
};


export const fetchQuestionnaireSummaryAPI =(questionnaire_response)=>{
  console.log(questionnaire_response)
  return axios.get(`${BASE_URL}/easydoc.easydoc.doctype.questionnaire_response.questionnaire_response.get_questionnaire_summary`,
    questionnaire_response,
    {withCredentials: true}
  )

}

export const logoutAPI = () => {
  return axios.get(
    `${BASE_URL}/easydoc.easydoc.api.easydoc_logout.logout`,
    {
      withCredentials: true,
    }
  );
};


export const uploadFileAPI = (file)=>{
  const formData = new FormData();
  formData.append("file",file);
  return axios.post(`${BASE_URL}/upload_file`,formData,{
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}