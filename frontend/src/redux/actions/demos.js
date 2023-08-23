import { CurrentApi } from "../../config/config";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const axiosInstance = axios.create({
  baseURL: CurrentApi,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstances = axios.create({
  baseURL: CurrentApi,
  headers: {
    "Content-Type": "application/json",
    type: "formData",
  },
});

export const JobPosting = createAsyncThunk("Postjob", async (payload) => {
  const response = await axiosInstance.post(`api/job-post`, payload);
  return response.data;
});
export const JobdataD = createAsyncThunk("JobdataD", async (payload) => {
  const response = await axiosInstance.post(`api/job-listing`, payload);
  return response.data;
});
export const MediaUploads = createAsyncThunk("mediaUplad", async (payload) => {
  const response = await axios.post(`${CurrentApi}/api/upload`, payload);
  return response.data;
});
export const jobSearch = createAsyncThunk("Search", async (payload) => {
  const response = await axiosInstance.post(`api/search`, payload);
  return response.data;
});
export const pdfofjob = createAsyncThunk("pdfofjob", async (payload) => {
  const response = await axiosInstance.post(`api/delete`, payload);
  return response.data;
});