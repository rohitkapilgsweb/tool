import { createSlice } from "@reduxjs/toolkit";
import { UserMebership, users } from "../actions/LoginAction";


const initialState = {
  isLoading: false,
  data: [],
  error: "",
};
const UpdateSlice = createSlice({
  name: "UserMebership",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(UserMebership?.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(UserMebership?.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
      state.error = "";
    });
    bulider.addCase(UserMebership?.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default UpdateSlice.reducer;