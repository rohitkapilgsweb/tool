import { createSlice } from "@reduxjs/toolkit";
import { LoginActions } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  LoginData: [],
  error: "",
};
const LoginDetails = createSlice({
  name: "userData",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(LoginActions.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(LoginActions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.LoginData = action?.payload;
      state.error = "";
    });
    bulider.addCase(LoginActions.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default LoginDetails.reducer;