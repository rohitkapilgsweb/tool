import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const createCity = createAsyncThunk("createcity", async (data) => {
  return apiRequest
    .post("location/createCity", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

export const getCityList = createAsyncThunk("citylis/location/citylist", async (data) => {
  return apiRequest
    .post("location/citylist", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

export const deleteCity = createAsyncThunk("deleteCity", async (id) => {
  return apiRequest
    .delete(`location/cityDelete/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

export const getCityById = createAsyncThunk("getCityById", async (id) => {
  return apiRequest
    .get(`location/cityById/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

export const editCity = createAsyncThunk("editCity", async (data) => {
  return apiRequest
    .post("location/updateCity", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

export const searchCity = createAsyncThunk("searchCity", async (data) => {
  return apiRequest
    .post(`location/citylist`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

export const cityDropdown = createAsyncThunk("cityDropdown", async (body) => {
  return apiRequest
    .post(`location/citydropdown`, body)
    .then((res) => res)
    .catch((err) => err)
});