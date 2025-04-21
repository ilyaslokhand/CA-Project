import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteFileAPI } from "@/api/easydocApi";

export const deleteFile = createAsyncThunk(
  "file/deleteFile",
  async (fileName, { rejectWithValue }) => {
    try {
      const response = await deleteFileAPI(fileName);
      console.log('delete response => ', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const deleteFileSlice = createSlice({
  name: "file",
  initialState: {
    deleting: false,
    deleteSuccess: false,
    deleteError: null,
  },
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleting = false;
      state.deleteSuccess = false;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFile.pending, (state) => {
        state.deleting = true;
        state.deleteSuccess = false;
        state.deleteError = null;
      })
      .addCase(deleteFile.fulfilled, (state) => {
        state.deleting = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload;
      });
  },
});

export const { resetDeleteStatus } = deleteFileSlice.actions;
export default deleteFileSlice.reducer;
