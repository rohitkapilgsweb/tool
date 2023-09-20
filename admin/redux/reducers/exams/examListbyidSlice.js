import { createSlice } from "@reduxjs/toolkit";
import { getExamById } from "../../actions/exams/createExam";

const exambyidSlice = createSlice({
  name: "examById",
  initialState: {
    value: 0,
    exam: [],
    status: "",
    loading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getExamById.pending, (state) => {
      state.exam = [];
      state.loading = true;
    })
    builder.addCase(getExamById.rejected, (state, action) => {
      state.exam = [];
      state.status = action?.status?.message;
      state.loading = false;
    });
    builder.addCase(getExamById.fulfilled, (state, action) => {
      state.exam = action.payload;
      state.status = "";
      state.loading = false;
    });
  },
});

export default exambyidSlice.reducer;