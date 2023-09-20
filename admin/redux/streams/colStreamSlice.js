import { createSlice } from "@reduxjs/toolkit";
import { getColStream, getColStreamlist } from "../actions/streams/addColStream";
import { collegeColstreams } from "../actions/college/college";

const colStreamSlice = createSlice({
  name: "colstream",
  initialState: {
    status: "",
    colStreamValue: [],
    colstreamDetails: [],
    collegeColStream:[],
    isLoading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getColStream.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getColStream.fulfilled, (state, action) => {
      state.colStreamSlice = action.payload
      state.isLoading = false
    });

// promise for get colstream with body
    builder.addCase(getColStreamlist.pending, (state, action) => {
      (state.status = action.payload?.status), (state.colstreamDetails = []);
    });
    builder.addCase(getColStreamlist.fulfilled, (state, action) => {
      (state.status = ""), (state.colstreamDetails = action.payload);
    });
// college colstreamlist
    builder.addCase(collegeColstreams.pending, (state, action) => {
      (state.status = action.payload?.status), (state.collegeColStream = []);
    });
    builder.addCase(collegeColstreams.fulfilled, (state, action) => {
      (state.status = ""), (state.collegeColStream = action.payload?.data?.data?.rows);
    });
  },
});

export default colStreamSlice.reducer;
