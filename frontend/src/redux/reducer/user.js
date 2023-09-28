import { createSlice } from "@reduxjs/toolkit";
import { users } from "../actions/LoginAction";


const initialState = {
  isLoading: false,
  Allusers: [],
  error: "",
};
const user = createSlice({
  name: "Allusers",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(users.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(users.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Allusers = action?.payload;
      state.error = "";
    });
    bulider.addCase(users.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default user.reducer;