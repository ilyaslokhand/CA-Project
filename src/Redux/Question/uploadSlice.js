import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadFileAPI } from "@/api/easydocApi";

export const uploadFile = createAsyncThunk(
  "upload/uploadFile",
  async (file, thunkAPI) => {
    try {
      
      const response = await uploadFileAPI(file);
      return response.data.message; // file metadata returned
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    file: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.file = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default uploadSlice.reducer;