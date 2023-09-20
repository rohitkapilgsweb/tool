import { createSlice } from "@reduxjs/toolkit";
import { getAllMasterFilter } from "../../actions/masterfilter/createmasterfilter";

const masterFilterAllSlice = createSlice({
  name: "allMasterfilterlist",
  initialState: {
    value: 0,
    masterfilterlist: [],
    status: "",
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMasterFilter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMasterFilter.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action?.status?.message;
    });
    builder.addCase(getAllMasterFilter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.masterfilterlist = action.payload;
    });
  },
});

export default masterFilterAllSlice.reducer;
