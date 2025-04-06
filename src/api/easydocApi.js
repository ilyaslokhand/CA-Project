import axios from "axios";

const BASE_URL = "https://doradoritesting.frappe.cloud/api/method";

export const LoginApi = ({ email, password }) => {
  axios.get(`${BASE_URL}/easydoc.easydoc.api.easydoc_login.login`, {
    params: { usr: email, pwd: password },
    withCredentials: true,
  });
};

export const fetchReportsAPI = (email) => {
  axios.get(
    `${BASE_URL}/easydoc.easydoc.doctype.questionnaire.questionnaire.get_assigned_questionnaires`,
    {
      params: { user: email },
      withCredentials: true,
    }
  );
};
