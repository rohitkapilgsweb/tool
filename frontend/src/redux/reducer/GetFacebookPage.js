import { createSlice } from "@reduxjs/toolkit";
import {  getTelegramToken, get_Facebook_Pages } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  getFacebookPages: [],
  error: "",
};
const getPages = createSlice({
  name: "getPages",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(get_Facebook_Pages.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(get_Facebook_Pages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getFacebookPages = action?.payload;
      state.error = "";
    });
    bulider.addCase(get_Facebook_Pages.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default getPages.reducer;