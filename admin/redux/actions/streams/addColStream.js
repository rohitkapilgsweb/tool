import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const CreateColStream = createAsyncThunk("addcolstream", async (data) => {
  return apiRequest
    .post("colStream/addColStream", data)
    .then((res) => res)
    .catch((err) => err);
});

export const getColStream = createAsyncThunk("getColStream", async (body) => {
  return apiRequest
    .post("colStream/colStreamList",body)
    .then((res) => res)
    .catch((err) => err);
})


// col stream action with body
export const getColStreamlist = createAsyncThunk("getColStreamlist/colStream/colStreamList", async (data) => {
  return apiRequest
    .post("colStream/colStreamList", data)
    .then((res) => res)
    .catch((err) => err);
})


export const deleteColStream = createAsyncThunk("deleteColStream", async (id) => {
  return apiRequest
    .delete(`colStream/colStreamDelete/${id}`)
    .then((res) => res)
    .catch((err) => err)
})

export const getColStreamById = createAsyncThunk("getColStreamById", async (id) => {
  return apiRequest
    .get(`colStream/colStreamById/${id}`)
    .then((res) => res)
    .catch((err) => err)
})

export const editColStream = createAsyncThunk("editColStream", async (data) => {
  console.log(data)
  return apiRequest
    .post("colStream/updateColStream", data)
    .then((res) => res)
    .catch((err) => err)
})