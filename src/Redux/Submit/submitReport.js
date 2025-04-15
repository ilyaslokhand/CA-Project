
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitReportAPI } from "@/api/easydocApi";


export const submitReport = createAsyncThunk(
  "report/submitReport",
  async (questionnaire_response, { rejectWithValue }) => {
    try {
      const res = await submitReportAPI(questionnaire_response);
      return res.data.message; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
const submitSlice = createSlice({
  name: "submit",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetSubmitState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubmitState } = submitSlice.actions;
export default submitSlice.reducer;
