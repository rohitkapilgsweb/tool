import { createSlice } from "@reduxjs/toolkit";
import { getMainStreamById } from "../actions/streams/addMainStreams";

const MainStreamByIdSlice = createSlice({
  name: "mainStreamById",
  initialState: {
    status: "",
    mainStreamByIdValue: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getMainStreamById.pending, (state, action) => {
      (state.status = action.payload?.status), (state.mainStreamByIdValue = []);
    });
    builder.addCase(getMainStreamById.fulfilled, (state, action) => {
      (state.status = ""), (state.mainStreamByIdValue = action.payload);
    });
  },
});

export default MainStreamByIdSlice.reducer;
