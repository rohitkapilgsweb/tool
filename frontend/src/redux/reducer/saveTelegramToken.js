import { createSlice } from "@reduxjs/toolkit";
import { LoginActions, saveTelegramToken } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  TelegramToken: [],
  error: "",
};
const TelegramTokens = createSlice({
  name: "saveTelegramToken",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(saveTelegramToken.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(saveTelegramToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.TelegramToken = action?.payload;
      state.error = "";
    });
    bulider.addCase(saveTelegramToken.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default TelegramTokens.reducer;