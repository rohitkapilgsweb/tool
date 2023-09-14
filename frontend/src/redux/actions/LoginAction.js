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
export const saveTelegramToken = createAsyncThunk("TelegramToken", async (payload) => {
  const response = await axiosInstance.post(`api/telegramToken`, payload);
  return response.data;
});

export const add_Facebook_Data = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.post(`api/add_facebook_account`, payload);
  return response.data;
});
export const get_Facebook_Data = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.post(`api/facebookaccount`, payload);
  return response.data;
});
export const get_Facebook_Pages = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.post(`api/get_pages`, payload);
  return response.data;
});
export const FacbookPostPublish = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.post(`api/FacbookPostPublish`, payload);
  return response.data;
});
export const GoogleApi = createAsyncThunk("GooglePlace", async (payload) => {
  const response = await axiosInstance.post(`api/place-api-search`, payload);
  return response.data;
});
export const BusinessListings = createAsyncThunk("BusinessListings", async (payload) => {
  const response = await axiosInstance.post(`api/google-business`, payload);
  return response.data;
});

// Whatsapp
export const whatsappSendMessege = createAsyncThunk("whatsappSendMessege", async (payload) => {
  const response = await axiosInstance.post(`api/whatsapp-send-messege`, payload);
  return response.data;
});


