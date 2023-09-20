import { createSlice } from "@reduxjs/toolkit";
import { getSubCategory, getSubCategoryById } from "../../actions/corporate/addsubcategory";

const getSubCategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    value: 0,
    addsubcategory: [],
    subcategoryIdList:[],
    status: "",
    isLoading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getSubCategory.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getSubCategory.rejected, (state, action) => {
      state.isLoading = false
      state.status = action?.status?.message;
    });
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.addsubcategory = action?.payload?.data?.data
      state.isLoading = false
    });
    builder.addCase(getSubCategoryById.rejected, (state, action) => {
      state.status = action?.status?.message;
    });
    builder.addCase(getSubCategoryById.fulfilled, (state, action) => {
      state.subcategoryIdList = action?.payload?.data?.data
    });
  },
});

export default getSubCategorySlice.reducer;
