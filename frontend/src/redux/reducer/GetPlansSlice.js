import { createSlice } from "@reduxjs/toolkit";
import { getPlans } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};
const GetPlansSlice = createSlice({
  name: "getPlans",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(getPlans?.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(getPlans?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
      state.error = "";
    });
    bulider.addCase(getPlans?.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default GetPlansSlice.reducer;