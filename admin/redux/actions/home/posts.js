import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const getPostList = createAsyncThunk("getPostList/auth/userFriendsPostList", async (data) => {
    return apiRequest
        .post("auth/userFriendsPostList", data)
        .then((res) => res)
        .catch((err) => err);
});

export const addPostComment = createAsyncThunk("addPostComment/auth/userFriendsPostList", async (data) => {
    return apiRequest
        .post("auth/addPostCommentsByUser", data)
        .then((res) => res)
        .catch((err) => err);
});

export const getpostComments = createAsyncThunk("getpostComments/auth/userCommentsList", async (data) => {
    return apiRequest
        .post("auth/userCommentsList", data)
        .then((res) => res)
        .catch((err) => err);
});

export const addPostLikes = createAsyncThunk("addPostLikes/auth/useAddLikes&Dislikes", async (data) => {
    return apiRequest
        .post("auth/useAddLikes&Dislikes", data)
        .then((res) => res)
        .catch((err) => err);
});

export const getPostLikeList = createAsyncThunk("getPostLikeList/auth/useAddLikes&Dislikes", async (data) => {
    return apiRequest
        .post("auth/userLikesList", data)
        .then((res) => res)
        .catch((err) => err);
});

export const userPostList = createAsyncThunk("userPostList/auth/userFullPostList", async (data) => {
    return apiRequest
        .post("auth/userFullPostList", data)
        .then((res) => res)
        .catch((err) => err);
});

export const commentLike = createAsyncThunk("commentLike/auth/CommentLikeByUser", async (data) => {
    return apiRequest
        .post("auth/CommentLikeByUser", data)
        .then((res) => res)
        .catch((err) => err);
});

export const commentLikeList = createAsyncThunk("commentLikeList/auth/userLikesList", async (data) => {
    return apiRequest
        .post("auth/userLikesList", data)
        .then((res) => res)
        .catch((err) => err)
});

export const announcementsList = createAsyncThunk("announcementsList/auth/userFriendsPostList", async (data) => {
    return apiRequest
        .post("auth/userFriendsPostList", data)
        .then((res) => res)
        .catch((err) => err)
})

export const hiringList = createAsyncThunk("hiringList/auth/userFriendsPostList", async (data) => {
    return apiRequest
        .post("auth/userFriendsPostList", data)
        .then((res) => res)
        .catch((err) => err)
})

//  api action for story post 

export const addStoryPost = createAsyncThunk("addStoryPost/auth/uploadStory", async (data) => {
    return apiRequest
        .post("auth/uploadStory", data) 
        .then((res) => res)
        .catch((err) => err)
});

export const getStoryPost = createAsyncThunk("getStoryPost/auth/getUserStory", async (data) => {
    return apiRequest
        .post("auth/getUserStory", data) 
        .then((res) => res)
        .catch((err) => err)
});

export const deleteStoryPost = createAsyncThunk("deleteStoryPost/auth/deleteUserStory", async (data) => {
    return apiRequest
        .post("auth/deleteUserStory", data) 
        .then((res) => res)
        .catch((err) => err)
});

