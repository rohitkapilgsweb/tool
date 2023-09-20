import { createSlice } from "@reduxjs/toolkit";
import { getSubStreamById } from "../actions/streams/addSubStream";

const SubStreamByIdSlice = createSlice({
  name: "subStreamById",
  initialState: {
    status: "",
    subStreamByIdValue: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getSubStreamById.pending, (state, action) => {
      (state.status = action.payload?.status), (state.subStreamByIdValue = []);
    });
    builder.addCase(getSubStreamById.fulfilled, (state, action) => {
      (state.status = ""), (state.subStreamByIdValue = action.payload);
    });
  },
});

export default SubStreamByIdSlice.reducer;
