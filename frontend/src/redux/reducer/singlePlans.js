import { createSlice } from "@reduxjs/toolkit";
import { getPlans, singlePlan } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};
const singlePlans = createSlice({
  name: "singlePlan",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(singlePlan?.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(singlePlan?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
      state.error = "";
    });
    bulider.addCase(singlePlan?.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
      state.error = "Data Not Found";
    });
  },
});

// export const  = jobDataSlice.actions;
export default singlePlans.reducer;