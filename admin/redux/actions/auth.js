import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiRequest } from "../services/api";

export const getUsers = createAsyncThunk("getUsersCall", async (data) => {
  return apiRequest
    .post("auth/userSignup", data)
    .then((res) => res)
    .catch((err) => err);
});

export const verifyOtp = createAsyncThunk("verifyOtpCall", async (data) => {
  return apiRequest
    .post("auth/verifyOtp", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      if (res?.data?.success) {
        // toast.success("otp verified");
        return res.data;
      } else {
        // toast.error("something went wrong");
        return res.data
      }
    })
    .catch((err) => {
      toast.error(err);
    });
});

export const login = createAsyncThunk("loginCall", async (data) => {
  return apiRequest
    .post("auth/login", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch((err) => err);
});



export const getUsersList = createAsyncThunk("getUsersList/auth/userList", async (data) => {
  const usersList = apiRequest.post("auth/userList", data)
  return usersList
});

export const getUserDetails = createAsyncThunk('', async (id) => {
  return apiRequest
    .post(`auth/userList`, { userId: id })
    .then(res => res)
    .catch(err => err)
})

export const forgetPassword = createAsyncThunk("forgetPassword/auth/userForgotPassword", async (data) => {
  return apiRequest
    .post(`auth/userForgotPassword`, { email: data })
    .then(res => res)
    .catch(err => err)
})
export const updatePassword = createAsyncThunk("updatePassword/auth/userPasswordUpdate", async (data) => {
  return apiRequest
    .post(`auth/userPasswordUpdate`, data)
    .then(res => res)
    .catch(err => err)
})

export const collegeApprovalList = createAsyncThunk("collegeApprovalList/auth/collegeRegisterPendingList", async () => {
  return apiRequest
    .post(`auth/collegeRegisterPendingList`)
    .then(res => res)
    .catch(err => err)
})

export const collegeApprovalByAdmin = createAsyncThunk("collegeApprovalByAdmin/auth/approveCollegeRegisterByAdmin", async (body) => {
  return apiRequest
    .post(`auth/approveCollegeRegisterByAdmin`,body)
    .then(res => res)
    .catch(err => err)
})