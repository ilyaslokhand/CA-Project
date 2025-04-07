import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/authSlice";
import reportReducer from "../Redux/getReports/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
  },
});

export default store;
