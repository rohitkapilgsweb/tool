import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRequest } from "../../services/api"

export const getUserDetailsById = createAsyncThunk('userSlice/get-User-Details', async (body) => {
    const apiData = await apiRequest.post(`auth/userList`, { userId: body })
    return apiData.data.data
});

export const getContentUserLiked = createAsyncThunk("userSlice/get-content-userLiked", async (body) => {
    const apiData = await apiRequest.post("auth/userLikesList", body)
    return apiData.data.data
});

export const getAllUserList = createAsyncThunk('userSlice/All-User-List', async (body) => {
    const apiData = await apiRequest.post(`auth/userList`, body)
    return apiData.data.data
});

export const addFriend = createAsyncThunk("userSlice/Friend/Add-Friend", async (body) => {
    const apiData = await apiRequest.post("auth/addFriend", body)
    return apiData.data
})

export const getPendingFriendRequest = createAsyncThunk("userSlice/Friend/Pending-Requests", async (body) => {
    const apiData = await apiRequest.post("auth/UserPendingFriend", body)
    return apiData.data.data
})

export const friendRequestStatus = createAsyncThunk("userSlice/Friend/Friend-Request-Status", async (body) => {
    const apiData = await apiRequest.post("auth/approveFriendRequest", body)
    return apiData.data.data
})