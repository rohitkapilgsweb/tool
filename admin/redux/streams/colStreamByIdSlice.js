import { createSlice } from "@reduxjs/toolkit";
import { getColStreamById } from "../actions/streams/addColStream";

const ColStreamByIdSlice = createSlice({
  name: "colStreamById",
  initialState: {
    status: "",
    colStreamByIdValue: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getColStreamById.pending, (state, action) => {
      (state.status = action.payload?.status), (state.colStreamByIdValue = []);
    });
    builder.addCase(getColStreamById.fulfilled, (state, action) => {
      (state.status = ""), (state.colStreamByIdValue = action.payload);
    });
  },
});

export default ColStreamByIdSlice.reducer;
