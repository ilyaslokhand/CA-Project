import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationApi } from "@/api/easydocApi";

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (email, { rejectWithValue }) => {
    try {
      const response = await NotificationApi(email);
      return response.data.message; // Frappe usually sends data in `message`
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧱 Slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default notificationSlice.reducer;
