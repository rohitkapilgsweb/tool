import { createSlice } from "@reduxjs/toolkit";
import {
  cardlevelIdDetails,
  courseByMainStream,
  fetchMoreCourse,
  filterMainstreamCourse,
  getCourse,
  getCoursebyId,
  getMasterFilterCourse,
  mainstreamCourseCount,
  searchCourse,
} from "../../actions/course/addcourse";
import { getMainStream } from "../../actions/streams/addMainStreams";

const courseListSlice = createSlice({
  name: "courseList",
  initialState: {
    value: 0,
    courselist: [],
    status: "",
    courselistCount: 0,
    isLoading: false,
    courseData: [],
    searchCourseList: [],
    mainStreamList: [],
    courseByStreamData: [],
    courseCountData: [],
    courseLevelList: [],
    filterMainstreamlist: [],
    getCourseLevelData: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action?.status?.message;
    });
    builder.addCase(getCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courselist = action.payload.data?.data?.rows;
    });
    
    builder.addCase(getCoursebyId.pending, (state, action) => {
      console.log(action.payload);
      state.isLoading = true
    });
    builder.addCase(getCoursebyId.rejected, (state, action) => {
      console.log(action.payload);
      state.isLoading = false
    });
    builder.addCase(getCoursebyId.fulfilled, (state, action) => {
      state.courseData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(searchCourse.rejected, (state, action) => {
      state.searchCourseList = [];
      state.status = action?.status?.message;
    });
    builder.addCase(searchCourse.fulfilled, (state, action) => {
      state.searchCourseList = action.payload;
      state.status = "";
    });
    builder.addCase(getMainStream.rejected, (state, action) => {
      state.mainStreamList = [];
      state.status = action?.status?.message;
    });
    builder.addCase(getMainStream.fulfilled, (state, action) => {
      state.mainStreamList = action.payload;
      state.status = "";
    });
    builder.addCase(courseByMainStream.rejected, (state, action) => {
      state.mainStreamList = [];
      state.status = action?.status?.message;
    });
    builder.addCase(courseByMainStream.fulfilled, (state, action) => {
      state.courselist = action.payload?.data?.data?.rows
      state.status = "";
      state.courselistCount = action.payload?.data?.data?.count;
    });
    builder.addCase(fetchMoreCourse.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMoreCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action?.status?.message;
    });
    builder.addCase(fetchMoreCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courselist = [...state.courselist,...action.payload.data?.data?.rows];
    });
    builder.addCase(mainstreamCourseCount.fulfilled, (state, action) => {
      state.courseCountData = action.payload;
    });
    builder.addCase(mainstreamCourseCount.rejected, (state, action) => {
      console.log(action.payload);
    });

    // cardLevel
    builder.addCase(cardlevelIdDetails.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(cardlevelIdDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courseLevelList = action.payload;
    });
    builder.addCase(cardlevelIdDetails.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
 // slice for choose by dream
    builder.addCase(filterMainstreamCourse.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(filterMainstreamCourse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.filterMainstreamlist = action.payload;
    });
    builder.addCase(filterMainstreamCourse.rejected, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
    });
    // builder.addCase(getMasterFilterCourse.pending, (state) => {
    //   state.isLoading = true;
    // });

    builder.addCase(getMasterFilterCourse.fulfilled, (state, action) => {
      state.getCourseLevelData = action.payload?.data?.data
    });
  },
});

export const {} = courseListSlice.actions;
export default courseListSlice.reducer;
