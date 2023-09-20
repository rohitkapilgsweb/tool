import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const AddMainCategory = createAsyncThunk(
  "AddMainCategory/corporate/addMainCategories",
  async (data) => {
    return apiRequest
      .post("corporate/addMainCategories", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getMainCategory = createAsyncThunk(
    "getMainCategory/corporate/mainCategoryList",
    async (data) => {
      return apiRequest
        .post("corporate/mainCategoryList", data)
        .then((res) => res)
        .catch((err) => err);
    }
  );

  export const getMainCategoryListById = createAsyncThunk(
    "getMainCategoryListById/corporate/mainCategoryList",
    async (data) => {
      return apiRequest
        .post("corporate/mainCategoryList", data)
        .then((res) => res)
        .catch((err) => err);
    }
  );

  export const updateMainCategoryList = createAsyncThunk(
    "updateMainCategory/corporate/updateMainCategoryList",
    async (data) => {
      return apiRequest
        .post("corporate/updateMainCategoryList", data)
        .then((res) => res)
        .catch((err) => err);
    }
  );

  export const deleteMainCategory = createAsyncThunk(
    "deleteMainCategory/corporate/deleteMainCategories",
    async (id) => {
      return apiRequest
        .delete(`corporate/deleteMainCategories/${id}`)
        .then((res) => res)
        .catch((err) => err);
    }
  );