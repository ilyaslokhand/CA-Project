import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchReportsAPI } from "@/api/easydocApi";

export const fetchReports = createAsyncThunk(
  "report/fetchReports",
  async (email, thunkAPI) => {
    try {
      const response = await fetchReportsAPI(email);
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;
