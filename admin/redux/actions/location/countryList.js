import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const getCountry = createAsyncThunk("getcountry", async (data) => {
  return apiRequest
    .post("location/countrylist", data)
    .then((req) => {
      return req;
    })
    .catch((err) => err);
});

export const addcountry = createAsyncThunk("addcountry/location/countrylist", async (data) => {
  return apiRequest
    .post("location/createCountry", data)
    .then((req) => {
      return req;
    })
    .catch((err) => err);
});

export const getCountrybyId = createAsyncThunk("addcountry/location/countrylist", async (id) => {
  return apiRequest
    .get(`location/countryById/${id}`)
    .then((req) => {
      return req;
    })
    .catch((err) => err);
});

export const editcountry = createAsyncThunk("editcountry/location/updateCountry", async (data) => {
  return apiRequest
    .post("location/updateCountry", data)
    .then((req) => {
      return req;
    })
    .catch((err) => err);
});

export const deleteCountry = createAsyncThunk("deleteCountry/location/countryDelete", async (id) => {
  return apiRequest
    .delete(`/location/countryDelete/${id}`)
    .then((req) => {
      return req;
    })
    .catch((err) => err);
});
