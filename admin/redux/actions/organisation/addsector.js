import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

// sectors actions --------------------------------------------

// create action of new sector
export const createNewSector = createAsyncThunk(
  "CreateNewSector/organisation/addSector",
  async (data) => {
    return apiRequest
      .post("organisation/addSector", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

// get list action of sectors
export const getlistSector = createAsyncThunk(
  "getlistSector/organisation/sectorList",
  async (body) => {
    return apiRequest
      .post("organisation/sectorList", body)
      .then((res) => res)
      .catch((err) => err);
  }
);

// delete action of sectors
export const deleteSector = createAsyncThunk(
  "deleteSector/organisation/sectorDelete/id",
  async (id) => {
    return apiRequest
      .delete(`organisation/sectorDelete/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

// action for particular sector id
export const getSectorById = createAsyncThunk(
  "getSectorById/organisation/sectorList",
  async (id) => {
    return apiRequest
      .post("organisation/sectorList", id)
      .then((res) => res)
      .catch((err) => err);
  }
);

// update action of sectors
export const editSector = createAsyncThunk(
  "editSector/organisation/updateSector",
  async (data) => {
    return apiRequest
      .post("organisation/updateSector", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

// industry actions-------------------------------------------------------

// create action of new industry
export const createNewIndustry = createAsyncThunk(
  "createNewIndustry/organisation/addIndustry",
  async (data) => {
    return apiRequest
      .post("organisation/addIndustry", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

// get action of industry
export const getIndustryList = createAsyncThunk(
  "getIndustryList/organisation/indusrtyList",
  async (data) => {
    return apiRequest
      .post("organisation/indusrtyList", data)
      .then((res) => res)
      .catch((err) => err);
  }
);

// action for particular industry id
export const getIndustryById = createAsyncThunk(
  "getIndustryById/organisation/indusrtyList",
  async (id) => {
    return apiRequest
      .post("organisation/indusrtyList", id)
      .then((res) => res)
      .catch((err) => err);
  }
);

// delete action of industry
export const deleteIndustry = createAsyncThunk(
  "deleteIndustry/organisation/industryDelete/id",
  async (id) => {
    return apiRequest
      .delete(`organisation/industryDelete/${id}`)
      .then((res) => res)
      .catch((err) => err);
  }
);

// update action of industry
export const editIndustry = createAsyncThunk(
  "editIndustry/organisation/updateIndustry",
  async (data) => {
    return apiRequest
      .post("organisation/updateIndustry", data)
      .then((res) => res)
      .catch((err) => err);
  }
);
