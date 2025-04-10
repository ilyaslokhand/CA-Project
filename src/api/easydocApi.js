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
