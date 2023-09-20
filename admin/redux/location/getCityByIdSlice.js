import { createSlice } from "@reduxjs/toolkit";
import { getCityById } from "../actions/location/createCity";

const cityById = createSlice({
  name: "cityById",
  initialState: {
    state: {},
    status: "",
  },

  extraReducers: (builder) => {
    builder.addCase(getCityById.rejected, (state, action) => {
        (state.state = {}), (state.status = action.status.message);
    }),
      builder.addCase(getCityById.fulfilled, (state, action) => {
        (state.state = action.payload), (state.status = "");
      });
  },
});

export default cityById.reducer;
