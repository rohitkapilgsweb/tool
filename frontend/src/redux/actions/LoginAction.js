import { CurrentApi } from "../../config/config";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const axiosInstance = axios.create({
  baseURL: CurrentApi,
  headers: {
    "Content-Type": "application/json",
  },
});


export const LoginActions = createAsyncThunk("Postjob", async (payload) => {
  const response = await axiosInstance.post(`api/register`, payload);
  return response.data;
});
export const userLoginAction = createAsyncThunk("Postjob", async (payload) => {
  const response = await axiosInstance.post(`api/login`, payload);
  return response.data;
});

export const getTelegramToken = createAsyncThunk("TelegramToken", async (payload) => {
  const response = await axiosInstance.post(`api/gettelegramToken`, payload);
  return response.data;
});
