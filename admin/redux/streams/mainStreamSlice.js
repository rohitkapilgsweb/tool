import { createSlice } from "@reduxjs/toolkit";
import { getMainStream } from "../actions/streams/addMainStreams";

const mainStreamSlice = createSlice({
  name: "mainstream",
  initialState: {
    status: "",
    mainStreamValue: [],
    isLoading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getMainStream.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getMainStream.fulfilled, (state, action) => {
      state.mainStreamValue = action.payload
      state.isLoading = false
    });
  },
});

export default mainStreamSlice.reducer;
