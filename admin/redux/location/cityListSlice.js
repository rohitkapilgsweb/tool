import { createSlice } from "@reduxjs/toolkit";
import { cityDropdown, getCityList, searchCity } from "../actions/location/createCity";

const cityListSlice = createSlice({
  name: "citylist",
  initialState: {
    cityList: [],
    status: "",
    isLoading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getCityList.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getCityList.rejected, (state, action) => {
      state.status = action?.status?.message
      state.isLoading = false
    });
    builder.addCase(getCityList.fulfilled, (state, action) => {
      state.cityList = action.payload
      state.isLoading = false
    });
    builder.addCase(searchCity.rejected, (state, action) => {
      (state.cityList = []), (state.status = action?.status?.message);
    });
    builder.addCase(searchCity.fulfilled, (state, action) => {
      (state.cityList = action.payload), (state.status = "");
    });
    builder.addCase(cityDropdown.rejected, (state, action) => {
      (state.cityList = []), (state.status = action?.status?.message);
    });
    builder.addCase(cityDropdown.fulfilled, (state, action) => {
      (state.cityList = action.payload), (state.status = "");
    });
  },
});

export default cityListSlice.reducer;
