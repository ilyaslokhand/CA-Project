import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/authSlice";
import reportReducer from "../Redux/getReports/reportSlice";
import questionReducer from "../Redux/Question/questionSlice";
import firstQuestionReducer from "../Redux/Question/saveFirstQuestionAnswer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    questions: questionReducer,
    firstQuestion: firstQuestionReducer,
  },
});

export default store;
