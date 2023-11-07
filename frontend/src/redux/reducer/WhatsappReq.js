import { createSlice } from "@reduxjs/toolkit";
import {  WhatsappRequest } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};
const WhatsappReq = createSlice({
  name: "userData",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(WhatsappRequest.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(WhatsappRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
      state.error = "";
    });
    bulider.addCase(WhatsappRequest.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default WhatsappReq.reducer;