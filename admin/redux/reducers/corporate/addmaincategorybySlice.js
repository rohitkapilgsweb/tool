import { createSlice } from "@reduxjs/toolkit";
import { getMainCategory, getMainCategoryListById } from "../../actions/corporate/addmaincategory";


const addmainCategorySlice = createSlice({
  name: "maincategory",
  initialState: {
    value: 0,
    addmaincategory : [],
    maincategoryId: [],
    status: "",
    isLoading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getMainCategory.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getMainCategory.rejected, (state, action) => {
      state.isLoading = false
      state.status = action?.status?.message;
    });
    builder.addCase(getMainCategory.fulfilled, (state, action) => {
      state.addmaincategory = action?.payload?.data?.data;
      state.isLoading = false
    });
    builder.addCase(getMainCategoryListById.rejected, (state, action) => {
      state.status = action?.status?.message;
    });
    builder.addCase(getMainCategoryListById.fulfilled, (state, action) => {
      state.maincategoryId = action?.payload?.data?.data;
    });
},
});

export default addmainCategorySlice.reducer;