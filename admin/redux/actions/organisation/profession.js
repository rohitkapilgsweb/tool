import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const createfamilycode = createAsyncThunk(
    "createfamilycode/profession/addfamilyCode",
    async (data) => {
        return apiRequest
            .post("profession/addfamilyCode", data)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const familycodeList = createAsyncThunk(
    "familycodeList/profession/familyCodeList",
    async (data) => {
        return apiRequest
            .post("profession/familyCodeList", data)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const familyCodeById = createAsyncThunk(
    "familyCodeById/profession/familyCodeList",
    async (id) => {
        return apiRequest
            .post(`profession/familyCodeList`, { id: id })
            .then((res) => res)
            .catch((err) => err);
    }
);

export const editFamilyCode = createAsyncThunk(
    "editFamilyCode/profession/updateFamilyCode",
    async (data) => {
        return apiRequest
            .post(`profession/updateFamilyCode`, data)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const deleteFamilycode = createAsyncThunk(
    "deleteFamilycode/profession/familyCodeDelete",
    async (id) => {
        return apiRequest
            .delete(`profession/familyCodeDelete/${Number(id)}`)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const createprofessioncode = createAsyncThunk(
    "createprofessioncode/profession/addProfessionCode",
    async (data) => {
        return apiRequest
            .post("profession/addProfessionCode", data)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const professioncodeList = createAsyncThunk(
    "professioncodeList/profession/professionCodeList",
    async (data) => {
        return apiRequest
            .post("profession/professionCodeList", data)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const professionCodeById = createAsyncThunk(
    "professionCodeById/profession/professionCodeList",
    async (id) => {
        return apiRequest
            .post(`profession/professionCodeList`, { id: id })
            .then((res) => res)
            .catch((err) => err);
    }
);

export const editProfessionCode = createAsyncThunk(
    "editProfessionCode/profession/updateProfessionCode",
    async (data) => {
        return apiRequest
            .post(`profession/updateProfessionCode`, data)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const deleteProfessioncode = createAsyncThunk(
    "deleteProfessioncode/profession/professionCodeDelete",
    async (id) => {
        return apiRequest
            .delete(`profession/professionCodeDelete/${Number(id)}`)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const addProfession = createAsyncThunk(
    "addProfession/profession/addProfessionRegister",
    async (data) => {
        return apiRequest
            .post(`profession/addProfessionRegister`, data)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const professionlist = createAsyncThunk(
    "professionlist/profession/professionRegisterList",
    async (data) => {
        return apiRequest
            .post(`profession/professionRegisterList`, data)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const deleteProfession = createAsyncThunk(
    "deleteProfession/profession/deleteProfessionRegister",
    async (id) => {
        return apiRequest
            .delete(`profession/deleteProfessionRegister/${Number(id)}`)
            .then((res) => res)
            .catch((err) => err);
    }
);

export const getProfessionById = createAsyncThunk(
    "getProfessionById/profession/professionRegisterList",
    async (id) => {
        return apiRequest
            .post(`profession/professionRegisterList`, { id: id })
            .then((res) => res)
            .catch((err) => err);
    }
);

export const updateProfession = createAsyncThunk(
    "updateProfession/profession/updateProfessionRegister",
    async (data) => {
        return apiRequest
            .post(`profession/updateProfessionRegister`, data)
            .then((res) => res)
            .catch((err) => err);
    }
);