import { createSlice } from "@reduxjs/toolkit";
import {  add_Facebook_Data, getTelegramToken, get_Facebook_Data } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  Facebook: [],
  error: "",
};
const GetFacebookSlice = createSlice({
    name: "GetFacebookData",
    initialState,
  
    extraReducers: (bulider) => {
      bulider.addCase(get_Facebook_Data.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      });
      bulider.addCase(get_Facebook_Data.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Facebook = action?.payload;
        state.error = "";
      });
      bulider.addCase(get_Facebook_Data.rejected, (state, action) => {
        state.error = "";
        state.isLoading = false;
      });
    },
  });
  
  // export const  = jobDataSlice.actions;
  export default GetFacebookSlice.reducer;