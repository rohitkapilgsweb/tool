import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/api";

export const addMasterFilter = createAsyncThunk(
  "addMasterFilter",
  async (data) => {
    return apiRequest
      .post("masterFilter/addMasterFilter", data)
      .then((res) => {
        return res;
      })
      .catch((err) => err);
  }
);

export const getMasterFilter = createAsyncThunk(
  "masterfilterlist",
  async (data) => {
    return apiRequest
      .post("masterFilter/masterFilterList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);
 
export const getAllMasterFilter = createAsyncThunk(
  "getAllMasterFilter",
  async (data) => {
    return apiRequest
      .get(`/masterFilter/masterFilterDropDown?types=${data}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const getAllMasterFilterProgram = createAsyncThunk(
  "getAllMasterFilterProgram",
  async (data) => {
    return apiRequest
      .post(`/masterFilter/masterFilterList?types=${data?.type}`, {
        search: data?.search,
      })
      .then((res) => res)
      .catch((err) => err);
  }
);

export const adminMasterfilterData = createAsyncThunk("adminMasterfilterData", async (data) => {
    return apiRequest
      .post(`masterFilter/masterFilterList?pageNo=${data.pageNo}&pageSize=${data.pageSize}`, data.search)
      .then((res) => res)
      .catch((err) => err);
})

export const deleteMasterFilter = createAsyncThunk(
  "deletemaster",
  async (id) => {
    return apiRequest
      .delete(`masterFilter/masterFilterDelete/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const MasterFilterById = createAsyncThunk(
  "masterfilterbyid",
  async (ID) => {
    return apiRequest
      .get(`masterFilter/masterFilterById/${ID}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

export const updateMasterFilter = createAsyncThunk(
  "updatemasterfilter",
  async (data) => {
    return apiRequest
      .post("masterFilter/updateMasterFilter", data)
      .then((res) => res)
      .catch((err) => err);
  }
);
