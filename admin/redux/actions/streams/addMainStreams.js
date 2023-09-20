import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const addMainStreams = createAsyncThunk("mainstream", async (data) => {
  return apiRequest
    .post("mainStream/addStream", data)
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      err;
    });
});

export const getMainStream = createAsyncThunk("getmainstream", async (data) => {
  return apiRequest
    .post("mainStream/streamList", data)
    .then((res) => res)
    .catch((err) => err);
});

export const deleteMainStream = createAsyncThunk(
  "deleteMainStream",
  async (id) => {
    console.log(id);
    return apiRequest
      .delete(`mainStream/streamDelete/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getMainStreamById = createAsyncThunk(
  "getMainStreamById",
  async (id) => {
    return apiRequest
      .get(`mainStream/mainStreamById/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const editMainStream = createAsyncThunk(
  "editMainStream",
  async (data) => {
    return apiRequest
      .post("mainStream/updateStream", data)
      .then((res) => res)
      .catch((err) => err);
  }
);
