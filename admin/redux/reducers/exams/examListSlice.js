import { createSlice } from "@reduxjs/toolkit";
import {
  adminexamList,
  fetchmoreExams,
  filterExamByStreamCourse,
  getAllExams,
  searchExams,
} from "../../actions/exams/createExam";

const examListSlice = createSlice({
  name: "examlist",
  initialState: {
    value: 0,
    examlist: [],
    examListCount:"",
    status: "",
    isLoading: false,
    examSearchList: [],
    filterMainstreamList: [],
    adminExamList: []
  },
  extraReducers: (builder) => {
    builder.addCase(getAllExams.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getAllExams.rejected, (state, action) => {
      state.isLoading = false
      state.status = action?.status?.message;
    });
    builder.addCase(getAllExams.fulfilled, (state, action) => {
      state.examlist = action.payload?.data?.data?.rows;
      state.examListCount = action?.payload?.data?.data?.count;
      state.isLoading = false
    });
    builder.addCase(fetchmoreExams.fulfilled, (state, action) => {
      state.examlist = [...state.examlist, ...action?.payload?.data?.data?.rows];
      state.examListCount = action?.payload?.data?.data?.count;
      state.isLoading = false
    });
    builder.addCase(adminexamList.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(adminexamList.rejected, (state, action) => {
      state.isLoading = false
      state.status = action?.status?.message;
    });
    builder.addCase(adminexamList.fulfilled, (state, action) => {
      state.adminExamList = action?.payload?.data?.data;
      state.isLoading = false
    });


    builder.addCase(searchExams.rejected, (state, action) => {
      console.log(action.payload);
      state.status = action?.status?.message;
    });
    builder.addCase(searchExams.fulfilled, (state, action) => {
      state.examSearchList = action?.payload?.data?.data?.rows;
    });
    builder.addCase(filterExamByStreamCourse.rejected, (state, action) => {
      console.log(action.payload);
      state.status = action?.status?.message;
    });
    builder.addCase(filterExamByStreamCourse.fulfilled, (state, action) => {
      state.filterMainstreamList = action?.payload;
    });
  },
});

export default examListSlice.reducer;
