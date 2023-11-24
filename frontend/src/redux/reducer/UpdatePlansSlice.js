import { createSlice } from "@reduxjs/toolkit";
import { UserMebership, updatePlans, users } from "../actions/LoginAction";


const initialState = {
  isLoading: false,
  data: [],
  error: "",
};
const updatePlanss = createSlice({
  name: "updatePlans",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(updatePlans?.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(updatePlans?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
      state.error = "";
    });
    bulider.addCase(updatePlans?.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default updatePlanss.reducer;