import { createSlice } from "@reduxjs/toolkit";
import { getUsers, getUsersList } from "../actions/auth";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    value: 0,
    isRegistering: false,
    users: [],
    status: "",
    UsersList: [],
  },

  // extraReducers: {
  //   [getUsers.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.users = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(getUsers.rejected, (state, action) => {
      state.users = [];
      state.isRegistering = false
      state.status = action.status.message;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.isRegistering = true
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isRegistering = false
      state.status = "";
    });
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.UsersList = action.payload;
      state.status = "";
      state.isRegistering = false
    });
  },
});

export default signUpSlice.reducer;

