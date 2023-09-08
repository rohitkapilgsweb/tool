import { createSlice } from "@reduxjs/toolkit";
import {  BusinessListings } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  BusinessListingss: [],
  error: "",
};
const BusinessListing = createSlice({
  name: "Google Place",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(BusinessListings.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(BusinessListings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.BusinessListingss = action?.payload;
      state.error = "";
    });
    bulider.addCase(BusinessListings.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default BusinessListing.reducer;