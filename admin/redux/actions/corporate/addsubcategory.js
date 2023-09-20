import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const AddSubCategory = createAsyncThunk(
  "AddSubCategory/corporate/addSubCategories",
  async (data) => {
    return apiRequest
      .post("corporate/addSubCategories", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getSubCategory = createAsyncThunk(
  "getSubCategory/corporate/SubCategoriesList",
  async (data) => {
    return apiRequest
      .post("corporate/SubCategoriesList",data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getSubCategoryById = createAsyncThunk(
  "getSubCategoryById/corporate/SubCategoriesList",
  async (data) => {
    return apiRequest
      .post("corporate/SubCategoriesList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const updateSubCategoryById = createAsyncThunk(
  "updateSubCategory/corporate/updateSubCategories",
  async (data) => {
    return apiRequest
      .post("corporate/updateSubCategories", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const deleteSubCategory = createAsyncThunk(
  "deleteSubCategory/deleteSubCategories",
  async (id) => {
    return apiRequest
      .delete(`corporate/deleteSubCategories/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);
