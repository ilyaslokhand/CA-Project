import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchQuestionnaireSummaryAPI } from "@/api/easydocApi";

export const fetchQuestionnaireSummary = createAsyncThunk(
  "summary/fetchSummary",
  async (questionnaire_response, { rejectWithValue }) => {
    try {
      const res = await fetchQuestionnaireSummaryAPI(questionnaire_response);
      console.log(res)
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const summarySlice = createSlice({
  name: "summary",
  initialState: {
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionnaireSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionnaireSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload
      })
      .addCase(fetchQuestionnaireSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default summarySlice.reducer;
