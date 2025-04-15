import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutAPI } from "@/api/easydocApi"; 


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutAPI();
      return response.message; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);


const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: "",
  },
  reducers: {
    resetLogoutState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload || "Logged out successfully";

      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.success = false;
      });
  },
});

export const { resetLogoutState } = logoutSlice.actions;

export default logoutSlice.reducer;