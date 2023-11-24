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
    "Content-Type": "multipart/form-data",
    type: "formData",
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

export const users = createAsyncThunk("users", async (payload) => {
  const response = await axiosInstance.get(`api/profile`, payload);
  return response.data;
});

export const UserMebership = createAsyncThunk("UserMebership", async (payload) => {
  const response = await axiosInstance.post(`api/update-user-profile/${payload?.id}`, payload?.update);
  return response.data;
});

export const getPlans = createAsyncThunk("getPlans", async (payload) => {
  const response = await axiosInstance.get(`api/plan`,payload);
  return response.data;
});
export const singlePlan = createAsyncThunk("singlePlan", async (payload) => {
  const response = await axiosInstance.get(`api/plan-details/${payload}`);
  return response.data;
});
export const updatePlans = createAsyncThunk("updatePlans", async (payload) => {
  const response = await axiosInstance.post(`api/update-plan/${payload.id}`,payload?.update);
  return response.data;
});
export const CreatePlan = createAsyncThunk("CreatePlan", async (payload) => {
  const response = await axiosInstances.post(`api/create-plan`,payload);
  return response.data;
});
export const Deleteplan = createAsyncThunk("Deleteplan", async (payload) => {
  const response = await axiosInstances.delete(`api/delete-plan/${payload}`);
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


export const WhatsappRequest = createAsyncThunk("WhatsappRequest", async (payload) => {
  const response = await axiosInstance.post(`api/create-whatsapp`, payload);
  return response.data;
});

export const Getwhatsapprequest = createAsyncThunk("WhatsappRequestss", async (payload) => {
  const response = await axiosInstance.get(`api/whatsapp`);
  return response.data;
});

export const MediaUploads = createAsyncThunk("mediaUplad", async (payload) => {
  const response = await axiosInstances.post(`/api/upload`, payload);
  return response.data;
});