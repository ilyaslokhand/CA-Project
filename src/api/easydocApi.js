import axios from "axios";

const BASE_URL = "https://doradoritesting.frappe.cloud";
// const SECOND_BASE_URL = "https://doradoritesting.frappe.cloud/"

export const LoginApi = ({ email, password }) => {
  return axios.get(`${BASE_URL}/api/method/easydoc.easydoc.api.easydoc_login.login`, {
    params: { usr: email, pwd: password },
    withCredentials: true,
  });
};

export const fetchReportsAPI = (email) => {
  return axios.get(
    `${BASE_URL}/api/method/easydoc.easydoc.doctype.questionnaire.questionnaire.get_assigned_questionnaires`,
    {
      params: { user: email },
      withCredentials: true,
    }
  );
};



export const fetchQuestionsAPI = (questionnaire) => {
  return axios.get(
    `${BASE_URL}/api/method/easydoc.easydoc.doctype.question.question.get_questionnaire_questions`,
    {
      params: { questionnaire: questionnaire },
      withCredentials: true,
    }
  );
};

export const saveFirstQuestionAnswerAPI = ({ questionnaire, client }) => {
  return axios.post(
    `${BASE_URL}/api/method/easydoc.easydoc.doctype.questionnaire_response.questionnaire_response.start_question`,
    { questionnaire, client },
    { withCredentials: true }
  );
};

export const saveAnswerAPI = (payload) => {


  return axios.post(
    `${BASE_URL}/api/method/easydoc.easydoc.doctype.questionnaire_response.questionnaire_response.save_answer`,
    payload,
    { withCredentials: true }
  );
};


export const fetchQuestionnaireSummaryAPI =(questionnaire_response)=>{
  
  return axios.get(
    `${BASE_URL}/api/method/easydoc.easydoc.doctype.questionnaire_response.questionnaire_response.get_questionnaire_summary`,
    {
      params: { questionnaire_response }, 
      withCredentials: true
    }
  );

}

export const submitReportAPI  = (questionnaire_response)=>{
  return axios.get(`${BASE_URL}/api/method/easydoc.easydoc.doctype.questionnaire_response.questionnaire_response.submit_questionnaire_response`,
    {
      params: { questionnaire_response }, 
      withCredentials: true
    }
  )

}

export const logoutAPI = () => {
  return axios.get(
    `${BASE_URL}/api/method/easydoc.easydoc.api.easydoc_logout.logout`,
    {
      withCredentials: true,
    }
  );
};

export const deleteFileAPI = (fileName) => {
  return axios.delete(
    `${BASE_URL}/api/resource/File/${fileName}`,
    { withCredentials: true }
  );
};

export const NotificationApi = (email) => {
  return axios.get(
    `${BASE_URL}/api/method/easydoc.easydoc.api.send_notification.get_user_notifications`,
    { 
      params: {user:email},
      withCredentials: true
     }
  );
};



export const uploadFileAPI = (file)=>{
  const formData = new FormData();
  formData.append("file",file);
  return axios.post(`${BASE_URL}/api/method/upload_file`,formData,{
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}