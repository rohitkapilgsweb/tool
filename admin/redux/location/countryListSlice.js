import { createSlice } from "@reduxjs/toolkit";
import { getCountry, getCountrybyId } from "../actions/location/countryList";

const countryListSlice = createSlice({
  name: "countrylist",
  initialState: {
    value: 0,
    countrylist: [],
    country:{},
    status: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getCountry.rejected, (state, action) => {
      state.countrylist = [];
      state.status = action?.status?.message;
    });
    builder.addCase(getCountry.fulfilled, (state, action) => {
      state.countrylist = action.payload;
      state.status = "";
    });
    builder.addCase(getCountrybyId.rejected, (state, action) => {
      state.country = [];
      state.status = action?.status?.message;
    });
    builder.addCase(getCountrybyId.fulfilled, (state, action) => {
      state.country = action.payload;
      state.status = "";
    });
  },
});

export default countryListSlice.reducer;
