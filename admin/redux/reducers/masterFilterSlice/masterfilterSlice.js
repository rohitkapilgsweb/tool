import { createSlice } from "@reduxjs/toolkit";
import { adminMasterfilterData, getMasterFilter } from "../../actions/masterfilter/createmasterfilter";

const masterFilterSlice = createSlice({
  name: "masterfilterlist",
  initialState: {
    value: 0,
    isLoading: false,
    masterfilterlist: [],
    status: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getMasterFilter.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getMasterFilter.rejected, (state, action) => {
      state.isLoading = false
      state.status = action?.status?.message;
    });
    builder.addCase(getMasterFilter.fulfilled, (state, action) => {
      state.masterfilterlist = action.payload;
      state.isLoading = false
    });

    builder.addCase(adminMasterfilterData.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(adminMasterfilterData.rejected, (state, action) => {
      state.isLoading = false
      state.status = action?.status?.message;
    });
    builder.addCase(adminMasterfilterData.fulfilled, (state, action) => {
      state.masterfilterlist = action.payload;
      state.isLoading = false
    });
  },
});

export default masterFilterSlice.reducer;
