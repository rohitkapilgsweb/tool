import { createSlice } from "@reduxjs/toolkit";
import {  add_Facebook_Data, getTelegramToken } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  Facebook: [],
  error: "",
};
const addFacebookSlice = createSlice({
  name: "AddFacebookData",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(add_Facebook_Data.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(add_Facebook_Data.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Facebook = action?.payload;
      state.error = "";
    });
    bulider.addCase(add_Facebook_Data.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default addFacebookSlice.reducer;

