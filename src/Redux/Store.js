import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/authSlice";
import reportReducer from "../Redux/getReports/reportSlice";
import questionReducer from "../Redux/Question/questionSlice";
import firstQuestionReducer from "../Redux/Question/saveFirstQuestionAnswer";
import saveAnswerReducer from "../Redux/Answer/saveAnswerSlice";
import summaryReducer from "../Redux/Summery/fetchQuestionnaireSummary";
import logoutReducer from "../Redux/logout/logoutSlice"
import uploadReducer from "../Redux/Question/uploadSlice"
import submitReducer from "../Redux/Submit/submitReport"
import deleteFileReducer from "../Redux/DeleteFile/deleteFileSlice"
import notificationReducer from "../Redux/Notification/fetchNotifications"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    questions: questionReducer,
    firstQuestion: firstQuestionReducer,
    saveAnswer: saveAnswerReducer,
    summary: summaryReducer,
    logout: logoutReducer,
    upload: uploadReducer,
    submit:submitReducer,
    file: deleteFileReducer,
    notifications: notificationReducer,

  },
});

export default store;
