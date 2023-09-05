import { createSlice } from "@reduxjs/toolkit";
import {  GoogleApi } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  GoogleApi: [],
  error: "",
};
const GooglePlaceSearch = createSlice({
  name: "Google Place",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(GoogleApi.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(GoogleApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.GoogleApi = action?.payload;
      state.error = "";
    });
    bulider.addCase(GoogleApi.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default GooglePlaceSearch.reducer;