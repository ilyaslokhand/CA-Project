import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveAnswerAPI } from "@/api/easydocApi";

export const saveAnswer = createAsyncThunk(
  "survey/saveAnswer",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await saveAnswerAPI(payload);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const saveAnswerSlice = createSlice({
  name: "saveAnswer",
  initialState: {
    loading: false,
    successMessage: null,
    error: null,
    answerData: null,
  },

  reducers: {
    clearSaveAnswerState: (state) => {
      state.loading = false;
      state.successMessage = null;
      state.error = null;
      state.answerData = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveAnswer.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
        state.answerData = null;
      })
      .addCase(saveAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Answer saved!";
        state.answerData = action.payload?.next_or_pre_question_answer || {};
      })
      .addCase(saveAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSaveAnswerState } = saveAnswerSlice.actions;
export default saveAnswerSlice.reducer;
