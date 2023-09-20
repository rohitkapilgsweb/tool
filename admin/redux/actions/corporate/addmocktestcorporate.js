import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

// corporate create api action
export const addMockTestCorporate = createAsyncThunk(
  "addMockTestCorporate/corporate/addMockTest",
  async (data) => {
    return apiRequest
      .post("corporate/addMockTest", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

// corporate get api list
export const getMockTestCorporatelist = createAsyncThunk(
  "getMockTestCorporatelist/corporate/mockTestlist",
  async (data) => {
    return apiRequest
      .post("corporate/mockTestlist",data)
      .then((res) => res)
      .catch((err) => err);
  }
);

// mocktest corporate data by particular id
export const getMockTestbyid = createAsyncThunk(
  "getMockTestbyid/corporate/mockTestlist",
  async (id) => {
    return apiRequest
      .post("corporate/mockTestlist", { id: id, answer: "true" })
      .then((res) => res)
      .catch((err) => err);
  }
);

// update mocktest
export const updateMocktest = createAsyncThunk(
  "updateMocktest/corporate/updateMockTest",
  async (data) => {
    return apiRequest
      .post("corporate/updateMockTest", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

// corporate delete api
export const deleteMocktestCorporate = createAsyncThunk(
  "corporate/deleteCorporate",
  async (id) => {
    return apiRequest
      .delete(`corporate/deleteMockTest/${id}`)
      .then((req) => req)
      .catch((err) => err);
  }
);

export const submitMockTest = createAsyncThunk(
  "corporate/addAnswer",
  async (data) => {
    return apiRequest
      .post(`corporate/addAnswer`, data)
      .then((req) => req.data)
      .catch((err) => err);
  }
);

export const mocktestResult = createAsyncThunk("corporate/userScore", async (data) => {
  return apiRequest
    .post(`corporate/userScore`, data)
    .then((req) => req.data)
    .catch((err) => err);
});
export const mocktestScoreCount = createAsyncThunk("corporate/userScoreCount", async (data) => {
  return apiRequest
    .post(`corporate/userScoreCount`, data)
    .then((req) => req.data)
    .catch((err) => err);
});

export const deleteMockQuestion = createAsyncThunk("corporate/mockTestQuestionDelete", async (data) => {
  return apiRequest
    .post(`corporate/mockTestQuestionDelete`, data)
    .then((req) => req)
    .catch((err) => err);
});