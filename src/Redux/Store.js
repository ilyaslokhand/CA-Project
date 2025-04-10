import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/authSlice";
import reportReducer from "../Redux/getReports/reportSlice";
import questionReducer from "../Redux/Question/questionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    questions: questionReducer,
  },
});

export default store;
