import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const addCollege = createAsyncThunk("College/Add", async (data) => {
  return apiRequest
    .post("college/addCollege", data)
    .then((res) => res)
    .catch((err) => err);
});

export const getColleges = createAsyncThunk("getColleges", async (data) => {
  return apiRequest
    // .post("college/popularCollegeList", data)
    .post("college/collegeList", data)
    .then((res) => res)
    .catch((err) => err);
});
export const getPopularCollege = createAsyncThunk("popularCollegeList", async (data) => {
  return apiRequest
    .post("college/popularCollegeList", data)
    // .post("college/collegeList", data)
    .then((res) => res)
    .catch((err) => err);
});

export const getCollegebyId = createAsyncThunk(
  "getCollegebyId",
  async (data) => {
    return apiRequest
      .post("college/collegeList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteCollege = createAsyncThunk(
  "deleteCollege/college/deleteCollege",
  async (id) => {
    return apiRequest
      .delete(`college/deleteCollege/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const CollegeLikes = createAsyncThunk(
  "collegeLikes/college/collegeLikeShareCount",
  async (data) => {
    return apiRequest
      .post(`college/collegeLikeShareCount`, data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const CollegeLikesList = createAsyncThunk(
  "collegeLikes/college/collegeLikeShareCount",
  async (id) => {
    return apiRequest
      .post("auth/userLikesList", {
        userId: id,
        categoryTypes: "college",
      })
      .then((res) => res)
      .catch((err) => err);
  }
);

// to update college
export const updateCollege = createAsyncThunk(
  "updateCollege/college/updateCollege",
  async (data) => {
    return apiRequest
      .post("college/updateCollege", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteAssociateCOllege = createAsyncThunk(
  "deleteAssociateCOllege/college/collegeAssociateCourselDelete",
  async (data) => {
    return apiRequest
      .post("college/collegeAssociateCourselDelete", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

//agency delete
export const deleteCollegeAgency = createAsyncThunk(
  "deleteCollegeAgency/college/collegeAgencyDelete",
  async (data) => {
    return apiRequest
      .post("college/collegeAgencyDelete", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

// fees delete
export const deleteCollegeFees = createAsyncThunk(
  "deleteCollegeFees/college/collegeCourseFeesDelete",
  async (id) => {
    return apiRequest
      .delete(`college/collegeCourseFeesDelete/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteCollegeStreams = createAsyncThunk(
  "deleteCollegeStreams/college/collegeStreamDelete",
  async (data) => {
    return apiRequest
      .post(`college/collegeStreamDelete`, data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const collegeSubstreams = createAsyncThunk("collegeSubstreams/subStream/subStreamList",async(body)=>{
  return apiRequest
      .post(`subStream/subStreamList`, body)
      .then((res) => res)
      .catch((err) => err);
})

export const collegeColstreams = createAsyncThunk("collegeColstreams/colStream/colStreamList",async(body)=>{
  return apiRequest
      .post(`colStream/colStreamList`, body)
      .then((res) => res)
      .catch((err) => err);
})