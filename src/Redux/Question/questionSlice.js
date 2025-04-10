import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchQuestionsAPI } from "@/api/easydocApi";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (questionnaireName, { rejectWithValue }) => {
    try {
      const response = await fetchQuestionsAPI(questionnaireName);
      return response.data.message.all_question;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const transformQuestions = (rawQuestions) => {
  return rawQuestions.map((q) => {
    let type = "";
    let options = [];
    let fields = [];
    let fileLabels = [];

    let singleChoiceOptions = [];
    let uploadOptions = [];

    switch (q.question_type) {
      case "MCQ":
        type = Number(q.multiselect) === 1 ? "multi-choice" : "single-choice";
        options = q.mcq_options.map((opt) => ({ label: opt, value: opt }));
        break;

      case "File Upload":
        type = "file-upload";
        options = q.file_labels;
        break;

      case "Text Input":
        type = "text-input";
        fields = q.text_labels;
        break;

      case "All":
        type = "All-Type";
        singleChoiceOptions =
          q.mcq_options?.map((opt) => ({ label: opt, value: opt })) || [];
        uploadOptions = q.file_labels || [];
        fields = q.text_labels || [];
        break;

      default:
        type = "unknown";
    }

    return {
      id: q.question_idx,
      name: q.question_name,
      question: q.question_text,
      type,
      options,
      fields,
      fileLabels,
      singleChoiceOptions,
      uploadOptions,
      isMulti: Number(q.multiselect) === 1,
      original: q,
    };
  });
};

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    loading: false,
    error: null,
    questions: [],
  },
  reducers: {
    resetQuestions: (state) => {
      state.questions = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = transformQuestions(action.payload); // ✅ Transformed!
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuestions } = questionSlice.actions;
export default questionSlice.reducer;
