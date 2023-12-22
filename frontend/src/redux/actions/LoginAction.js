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
    "Authorization":`Bearer ${token}`
  },
});
export const axiosFacebookInstances = axios.create({
  baseURL: 'https://graph.facebook.com/v18.0/',
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// 

export const getPageDetails = createAsyncThunk("Postjob", async (payload) => {
  const response = await axiosInstance.get(`${payload?.page_id}/insights?metric=${payload?.metric}&access_token=${payload?.access_token}`);
  return response.data;
});

// 

export const userGetProfile = createAsyncThunk("userGetProfile", async (payload) => {
  const response = await axiosInstance.get(`api/user-profile-details/${payload}`);
  return response.data;
});
export const UpdateUserProfifle = createAsyncThunk("UpdateUserProfifle", async (payload) => {
  const response = await axiosInstance.post(`api/update-user-profile/${payload?.id}`,payload?.data);
  return response.data;
});
export const UpdateUserProfifleImg = createAsyncThunk("UpdateUserProfifle", async (payload) => {
  const response = await axiosInstances.post(`api/update-user-profile/${payload?.id}`,payload?.data);
  return response.data;
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
  const response = await axiosInstance.post(`api/update-telegram/${payload?.id}`,payload?.telegram_tokens);
  return response.data;
});

export const add_Facebook_Data = createAsyncThunk("add_Facebook_Data", async (payload) => {
  const response = await axiosInstance.post(`api/create-facebook`, payload);
  return response.data;
});
export const get_Facebook_Data = createAsyncThunk("get_Facebook_Data", async (payload) => {
  const response = await axiosInstance.get(`api/facebook`);
  return response.data;
});
export const UnlinkedAccount = createAsyncThunk("UnlinkedAccount", async (payload) => {
  const response = await axiosInstance.delete(`api/delete-facebook/${payload}`);
  return response.data;
});
export const get_Facebook_Pages = createAsyncThunk("get_Facebook_Pages", async (payload) => {
  const response = await axiosInstance.post(`api/facebook/pages/${payload?.id}`, payload?.accessToken);
  return response.data;
});
export const FacbookPostPublish = createAsyncThunk("FacbookPostPublish", async (payload) => {
  const response = await axiosInstance.post(`api/publish-post`, payload);
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


// Media

export const MediaUploads = createAsyncThunk("mediaUplad", async (payload) => {
  const response = await axiosInstances.post(`/api/create-media`, payload);
  return response.data;
});
export const GetMedia = createAsyncThunk("GetMedia", async () => {
  const response = await axiosInstance.get(`/api/media`);
  return response.data;
});
export const deleteMedia = createAsyncThunk("deleteMedia", async (payload) => {
  const response = await axiosInstance.delete(`/api/delete-media/${payload}`);
  return response.data;
});
export const getSigleMedia = createAsyncThunk("getSigleMedia", async (payload) => {
  const response = await axiosInstance.get(`/api/media-detail/${payload}`);
  return response.data;
});

export const getAllPost = createAsyncThunk("getAllPost", async (payload) => {
  const response = await axiosInstance.get(`/api/facebook-posts`);
  return response.data;
});

export const detelePost = createAsyncThunk("detelePost", async (payload) => {
  const response = await axiosInstance.delete(`/api/facebook-posts/${payload?.post_id}/${payload?.token}`);
  return response.data;
});

// hELP

export const getHelpTicket = createAsyncThunk("HelpTicket", async (payload) => {
  const response = await axiosInstance.get(`api/help`);
  return response.data;
});