import { createSlice } from "@reduxjs/toolkit";
import { getAllPost } from "../actions/LoginAction";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};
const getAllPosts = createSlice({
  name: "getAllPosts",
  initialState,

  extraReducers: (bulider) => {
    bulider.addCase(getAllPost.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    bulider.addCase(getAllPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action?.payload;
      state.error = "";
    });
    bulider.addCase(getAllPost.rejected, (state, action) => {
      state.error = "";
      state.isLoading = false;
    });
  },
});

// export const  = jobDataSlice.actions;
export default getAllPosts.reducer;