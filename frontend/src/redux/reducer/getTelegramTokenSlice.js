import { createSlice } from "@reduxjs/toolkit";
import {  getTelegramToken } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  TelegramTokens: [],
  error: "",
};
const TelegramToken = createSlice({
  name: "TelegramToken",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(getTelegramToken.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(getTelegramToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.TelegramTokens = action?.payload;
      state.error = "";
    });
    bulider.addCase(getTelegramToken.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default TelegramToken.reducer;