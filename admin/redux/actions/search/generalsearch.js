import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const generalSearch = createAsyncThunk("generalSearch/general/generalSearchList", async (data) => {
    return apiRequest
        .post("general/generalSearchList", data)
        .then((res) => res)
        .catch((err) => err);
});

export const postSearch = createAsyncThunk("postSearch/auth/userFullPostList", async (data) => {
    return apiRequest
        .post("auth/userFullPostList", data)
        .then((res) => res)
        .catch((err) => err);
});

