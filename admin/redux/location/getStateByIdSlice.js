import { createSlice } from "@reduxjs/toolkit";
import { getStateById } from "../actions/location/createState";

const stateById = createSlice({
  name: "stateById",
  initialState: {
    state: {},
    status: "",
  },

  extraReducers: (builder) => {
    builder.addCase(getStateById.rejected, (state, action) => {
        (state.state = {}), (state.status = action.status.message);
    }),
      builder.addCase(getStateById.fulfilled, (state, action) => {
        (state.state = action.payload), (state.status = "");
      });
  },
});

export default stateById.reducer;
