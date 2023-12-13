import { CurrentApi } from "../../config/config";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token=localStorage.getItem('token')
export const axiosInstance = axios.create({
  baseURL: CurrentApi,
  headers: {
    "Content-Type": "application/json",
    "Authorization":`Bearer ${token}`
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






export const getTelegramToken = createAsyncThunk("getTelegramToken", async (payload) => {
  const response = await axiosInstance.get(`api/telegram-details/${payload}`, );
  return response.data;
});
export const saveTelegramToken = createAsyncThunk("saveTelegramToken", async (payload) => {
  const response = await axiosInstance.post(`api/create-telegram`, payload);
  return response.data;
});
export const updateTelegramToken = createAsyncThunk("updateTelegramToken", async (payload) => {
  const response = await axiosInstance.post(`api/update-telegram/${payload.id}`,payload.telegram_token);
  return response.data;
});

export const add_Facebook_Data = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.post(`api/create-facebook`, payload);
  return response.data;
});
export const get_Facebook_Data = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.get(`api/facebook`);
  return response.data;
});
export const UnlinkedAccount = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.delete(`api/delete-facebook/${payload}`);
  return response.data;
});
export const get_Facebook_Pages = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.get(`api/facebook/pages/${payload}`);
  return response.data;
});
export const FacbookPostPublish = createAsyncThunk("FacebookData", async (payload) => {
  const response = await axiosInstance.post(`api/FacbookPostPublish`, payload);
  return response.data;
});
export const GoogleApi = createAsyncThunk("GooglePlace", async (payload) => {
  const response = await axiosInstance.get(`api/get-place-id/${payload.msg_body}`);
  return response.data;
});
export const BusinessListings = createAsyncThunk("BusinessListings", async (payload) => {
  const response = await axiosInstance.get(`api/place-details/${payload}`);
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
export const UpdateTRequest = createAsyncThunk("UpdateTRequest", async (payload) => {
  const response = await axiosInstance.post(`api/update-whatsapp/${payload.id}`, payload.update);
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

// hELP

export const getHelpTicket = createAsyncThunk("HelpTicket", async (payload) => {
  const response = await axiosInstance.get(`api/help`);
  return response.data;
});