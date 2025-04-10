import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveFirstQuestionAnswerAPI } from "@/api/easydocApi";

export const saveFirstQuestionAnswer = createAsyncThunk(
  "firstQuestion/save",
  async ({ questionnaire, client }) => {
    const response = await saveFirstQuestionAnswerAPI({
      questionnaire,
      client,
    });
    console.log(response);
    return response.data.message;
  }
);

const firstQuestionSlice = createSlice({
  name: "firstQuestion",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveFirstQuestionAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveFirstQuestionAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveFirstQuestionAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default firstQuestionSlice.reducer;
