import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRequest } from "../services/api";


export const getUserTypeList = createAsyncThunk('getUserTypeList/auth/RegisterPendingList', async (body) => {
    const apiData = await apiRequest.post(`auth/RegisterPendingList`, body)
    return apiData.data
});


export const approvePendingRequest = createAsyncThunk('approvePendingRequest/auth/approvePendingRegisterByAdmin', async (body) => {
    const apiData = await apiRequest.post(`auth/approvePendingRegisterByAdmin`, body)
    return apiData.data
});

