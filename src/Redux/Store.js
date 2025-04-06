import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
