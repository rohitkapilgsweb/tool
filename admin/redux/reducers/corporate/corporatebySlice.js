import { createSlice } from "@reduxjs/toolkit";
import {
  CorporateData,
  corporatelikesList,
  getCorporateById,
  getCorporateData,
} from "../../actions/corporate/addcorporate";

const corporateDataSlice = createSlice({
  name: "coursebyid",
  initialState: {
    value: 0,
    corporatelist: [],
    getListCorporate: [],
    getCorporateId: [],
    corplikeslist:[],
    status: "",
    isLoading:false
  },
  extraReducers: (builder) => {
    builder.addCase(CorporateData.rejected, (state, action) => {
      state.corporatelist = [];
      state.status = action?.status?.message;
    });
    builder.addCase(CorporateData.fulfilled, (state, action) => {
      state.corporatelist = action?.payload?.data?.data;
      state.status = "";
    });
    builder.addCase(getCorporateData.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getCorporateData.rejected, (state, action) => {
      state.isLoading = false
      state.status = action?.status?.message;
    });
    builder.addCase(getCorporateData.fulfilled, (state, action) => {
      state.getListCorporate = action?.payload?.data?.data
      state.isLoading = false
    });
    builder.addCase(getCorporateById.rejected, (state, action) => {
      state.getCorporateId = [];
      state.status = action?.status?.message;
    });
    builder.addCase(getCorporateById.fulfilled, (state, action) => {
      state.getCorporateId = action?.payload?.data?.data?.rows
      state.status = "";
    });
    builder.addCase(corporatelikesList.rejected, (state, action) => {
      state.corplikeslist = [];
      state.status = action?.status?.message;
    });
    builder.addCase(corporatelikesList.fulfilled, (state, action) => {
      state.corplikeslist = action?.payload?.data?.data?.rows
      state.status = "";
    });
  },
});

export default corporateDataSlice.reducer;
