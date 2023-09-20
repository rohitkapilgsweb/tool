import { createSlice } from "@reduxjs/toolkit";
import {
  getSubStream,
  getSubstreamData,
} from "../actions/streams/addSubStream";
import { collegeSubstreams } from "../actions/college/college";

const subStreamSlice = createSlice({
  name: "substream",
  initialState: {
    status: "",
    subStreamValue: [],
    subStreamDetails: [],
    subStreamCollegeList:[],
    isLoading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getSubStream.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getSubStream.fulfilled, (state, action) => {
     state.subStreamValue = action.payload
     state.isLoading = false

    });

    // slice for substream with body
    builder.addCase(getSubstreamData.pending, (state, action) => {
      (state.status = action.payload?.status), (state.subStreamDetails = []);
    });
    builder.addCase(getSubstreamData.fulfilled, (state, action) => {
      (state.status = ""), (state.subStreamDetails = action.payload);
    });
    
    //slice for substream in college
    builder.addCase(collegeSubstreams.pending, (state, action) => {
      (state.status = action.payload?.status), (state.subStreamDetails = []);
    });
    builder.addCase(collegeSubstreams.fulfilled, (state, action) => {
      (state.status = ""), (state.subStreamCollegeList = action.payload?.data?.data?.rows);
    });

  },
});

export default subStreamSlice.reducer;
