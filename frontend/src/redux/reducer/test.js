import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../auctions/userLogin";
import { JobPosting } from "../auctions/JobPostingAction";

const initialState = {
  isLoading: false,
  jobData: [],
  error: "",
};
const jobDataSlice = createSlice({
  name: "userData",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(JobPosting.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(JobPosting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobData = action?.payload;
      state.error = "";
    });
    bulider.addCase(JobPosting.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default jobDataSlice.reducer;