import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const addCourse = createAsyncThunk("addCourse", async (data) => {
  return apiRequest
    .post("Course/addCourse", data)
    .then((res) => res)
    .catch((err) => err);
});

export const getCourse = createAsyncThunk("getCourse", async (data) => {
  return apiRequest
    .post("Course/courselist", data)
    .then((res) => res)
    .catch((err) => err);
});

export const fetchMoreCourse = createAsyncThunk("fetchMoreCourse/",async(data)=>{
  return apiRequest
    .post("Course/courseByStream", data)
    .then((res) => res)
    .catch((err) => err);
})

export const deleteCourse = createAsyncThunk("deleteCourse", async (id) => {
  return apiRequest
    .delete(`Course/courseDelete/${id}`)
    .then((res) => res)
    .catch((err) => err);
});

export const getCoursebyId = createAsyncThunk("getCoursebyId", async (data) => {
  return apiRequest
    .post("Course/courselist", data)
    .then((res) => res)
    .catch((err) => err);
});

export const editCourse = createAsyncThunk("editCourse", async (data) => {
  return apiRequest
    .post("Course/courseUpdate",data)
    .then((res) => res)
    .catch((err) => err);
});

export const searchCourse = createAsyncThunk("searchCourse", async (data) => {
  return apiRequest
    .post("Course/courselist", data)
    .then((res) => res)
    .catch((err) => err);
});

export const courseByMainStream = createAsyncThunk(
  "courseByMainStream",
  async (data) => {
    return apiRequest
      .post("course/courseByStream", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const mainstreamCourseCount = createAsyncThunk(
  "mainstreamCourseCount",
  async () => {
    return apiRequest
      .post("course/courseByStream")
      .then((res) => res)
      .catch((err) => err);
  }
);

export const cardlevelIdDetails = createAsyncThunk(
  "cardlevelIdDetails",
  async (data) => {
    return apiRequest
      .post("course/courseByStream", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getMasterFilterCourse = createAsyncThunk(
  "getMasterFilterCourse",
  async (data) => {
    return apiRequest
      .get(`masterFilter/masterFilterByCourseLevel?types=courselevel`)
      .then((res) => res)
      .catch((err) => err);
  }
);
export const filterMainstreamCourse = createAsyncThunk(
  "filterMainstreamCourse",
  async (data) => {
    return apiRequest
      .post("course/courseByStream", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteCourseExam = createAsyncThunk(
  "deleteCourseExam",
  async (id) => {
    return apiRequest
      .delete(`Course/courseExamDelete/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);