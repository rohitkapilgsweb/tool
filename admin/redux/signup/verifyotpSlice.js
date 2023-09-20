import { createSlice } from "@reduxjs/toolkit";
import { verifyOtp } from "../actions/auth";

const verifyOtpSlice = createSlice({
  name: "verifyotp",
  initialState: {
    value: 0,
    users: [],
    status: "",
  },

  extraReducers: (builder) => {
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.users = [];
      state.status = action.status.message;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {

      state.users = action.payload;
      state.status = "";
    });
  },
});

export default verifyOtpSlice.reducer;
