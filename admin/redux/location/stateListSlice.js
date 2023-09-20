import { createSlice } from "@reduxjs/toolkit";
import { getState, searchState } from "../actions/location/createState";

const stateListSlice = createSlice({
  name: "statelist",
  initialState: {
    stateList: [],
    status: "",
    isLoading: false
  },

  extraReducers: (builder) => {
    builder.addCase(getState.pending, (state) => {
      state.isLoading = true
    }),
    builder.addCase(getState.rejected, (state, action) => {
      state.status = action.status.message
      state.isLoading = false
    }),
      builder.addCase(getState.fulfilled, (state, action) => {
        (state.stateList = action.payload)
        state.isLoading = false
      }),
      builder.addCase(searchState.rejected,(state,action)=>{
        (state.stateList = []), (state.status = action.status.message);
      }),
      builder.addCase(searchState.fulfilled, (state,action)=>{
        (state.stateList = action.payload), (state.status = "");
      })
  },
});

export default stateListSlice.reducer;
