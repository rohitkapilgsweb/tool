import { createSlice } from "@reduxjs/toolkit";
import { getCoursebyId } from "../../actions/course/addcourse";

const coursebyIdListSlice = createSlice({
  name: "coursebyid",
  initialState: {
    value: 0,
    course: [],
    status: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getCoursebyId.rejected, (state, action) => {
      state.course = [];
      state.status = action?.status?.message;
    });
    builder.addCase(getCoursebyId.fulfilled, (state, action) => {
      state.course = action.payload;
      state.status = "";
    });
  },
});

export default coursebyIdListSlice.reducer;
