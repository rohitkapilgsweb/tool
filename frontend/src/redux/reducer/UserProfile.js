import { createSlice } from "@reduxjs/toolkit";
import { LoginActions, userGetProfile, userLoginAction } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};
const userGetProfiles = createSlice({
  name: "userGetProfiles",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(userGetProfile.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(userGetProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
      state.error = "";
    });
    bulider.addCase(userGetProfile.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

export default userGetProfiles.reducer;