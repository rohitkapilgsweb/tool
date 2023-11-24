import { createSlice } from "@reduxjs/toolkit";
import {  Deleteplan } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};
const DeletePlan = createSlice({
    name: "DeletePlan",
    initialState,
  
    extraReducers: (bulider) => {
      bulider.addCase(Deleteplan.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      });
      bulider.addCase(Deleteplan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action?.payload;
        state.error = "";
      });
      bulider.addCase(Deleteplan.rejected, (state, action) => {
        state.error = "";
        state.isLoading = false;
      });
    },
  });
  
  // export const  = jobDataSlice.actions;
  export default DeletePlan.reducer;