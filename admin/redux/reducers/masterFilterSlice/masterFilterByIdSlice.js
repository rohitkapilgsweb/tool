import { createSlice } from "@reduxjs/toolkit";
import { MasterFilterById } from "../../actions/masterfilter/createmasterfilter";

const masterFilterByidSlice = createSlice({
  name: "masterfilterbyid",
  initialState: {
    value: 0,
    masterfilterbyid: [],
    status: "",
  },
  extraReducers: (builder) => {
    builder.addCase(MasterFilterById.rejected, (state, action) => {
      state.masterfilterbyid = [];
      state.status = action?.status?.message;
    });
    builder.addCase(MasterFilterById.fulfilled, (state, action) => {
      state.masterfilterbyid = action.payload;
      state.status = "";
    });
  },
});

export default masterFilterByidSlice.reducer;
