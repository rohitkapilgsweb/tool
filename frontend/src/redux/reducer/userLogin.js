import { createSlice } from "@reduxjs/toolkit";
import { LoginActions, userLoginAction } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  LoginData: [],
  error: "",
};
const UserLogin = createSlice({
  name: "userData",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(userLoginAction.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(userLoginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.LoginData = action?.payload;
      state.error = "";
    });
    bulider.addCase(userLoginAction.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default UserLogin.reducer;