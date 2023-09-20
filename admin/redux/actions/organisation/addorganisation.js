import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const addOrganisation = createAsyncThunk(
  "addOrganisation/organisation/addOrganisation",
  async (data) => {
    return apiRequest
      .post("organisation/addOrganisation", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getOrganisationlist = createAsyncThunk(
  "getOrganisationlist/organisation/organisationList",
  async (data) => {
    return apiRequest
      .post("organisation/organisationList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getOrganisationbyid = createAsyncThunk(
  "getOrganisationbyid/organisation/organisationList",
  async (id) => {
    return apiRequest
      .post("organisation/organisationList", { id: id })
      .then((res) => res)
      .catch((err) => err);
  }
);

export const updateOrganisation = createAsyncThunk(
  "updateOrganisation/organisation/updateOrganisation",
  async (data) => {
    return apiRequest
      .post("organisation/updateOrganisation", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteOrganisation = createAsyncThunk(
  "deleteOrganisation/organisation/organisationDelete",
  async (id) => {
    return apiRequest
      .delete(`organisation/organisationDelete/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const companyLikeslist = createAsyncThunk(
  "companyLikeslist/auth/userLikesList",
  async (id) => {
    return apiRequest
      .post("auth/userLikesList", { userId: id, categoryTypes: "organisation" })
      .then((res) => res)
      .catch((err) => err);
  }
);

export const companyLike = createAsyncThunk(
  "companyLike/organisation/addOrganisationLikes",
  async (data) => {
    return apiRequest
      .post("organisation/addOrganisationLikes", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const companyGroupList = createAsyncThunk(
  "companyGroupList/organisation/organisationGroupList",
  async (data) => {
    return apiRequest
      .post("organisation/organisationGroupList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);
export const companyNameList = createAsyncThunk(
  "companyNameList/organisation/companyList",
  async (data) => {
    return apiRequest
      .post("organisation/companyList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);
export const companyBrandList = createAsyncThunk(
  "companyBrandList/organisation/organisationBrandList",
  async (data) => {
    return apiRequest
      .post("organisation/organisationBrandList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);