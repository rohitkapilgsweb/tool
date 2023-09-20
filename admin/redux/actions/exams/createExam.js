import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const addExam = createAsyncThunk("addExam", async (data) => {
  return apiRequest
    .post("Exam/addExam", data)
    .then((req) => req)
    .catch((err) => err);
});

export const getAllExams = createAsyncThunk("getAllExams", async (data) => {
  return apiRequest
    .post("Exam/examByStreamCourse", data)
    // .post("Exam/allExamList", data)
    .then((req) => req)
    .catch((err) => err);
});

export const fetchmoreExams = createAsyncThunk("fetchmoreExams", async (data) => {
  return apiRequest
    .post("Exam/examByStreamCourse", data)
    // .post("Exam/allExamList", data)
    .then((req) => req)
    .catch((err) => err);
});
export const searchExams = createAsyncThunk("searchExam", async (data) => {
  return apiRequest
    .post("Exam/examlist", data)
    .then((req) => req)
    .catch((err) => err);
});

export const getExams = createAsyncThunk("getExam", async (id) => {
  return apiRequest
    .post("Exam/examlist", id)
    .then((req) => req)
    .catch((err) => err);
});

export const getExamById = createAsyncThunk("getExamById", async (key) => {
  let data = { id: key };
  return apiRequest
    .post("Exam/examlist", data)
    .then((req) => req)
    .catch((err) => err);
});

export const deleteExam = createAsyncThunk("deleteExam", async (id) => {
  return apiRequest
    .delete(`Exam/deleteExam/${id}`)
    .then((req) => req)
    .catch((err) => err);
});

export const editExam = createAsyncThunk("editExam", async (data) => {
  return apiRequest
    .post("Exam/updateExam", data)
    .then((req) => req)
    .catch((err) => err);
}
);
export const filterExamByStreamCourse = createAsyncThunk(
  "filterExamByCourse",
  async (data) => {
    return apiRequest
      .post("Exam/examByStreamCourse", data)
      .then((req) => req)
      .catch((err) => err);
  }
);

export const examFaqDelete = createAsyncThunk(
  "examFaqDelete/exam/examFAQDelete",
  async (data) => {
    return apiRequest
      .post("exam/examFAQDelete", data)
      .then((req) => req)
      .catch((err) => err);
  }
);

export const adminexamList = createAsyncThunk("adminexamList/Exam/examlist", async (data) => {
  return apiRequest
    .post("exam/examlist", data)
    .then((req) => req)
    .catch((err) => err);
});