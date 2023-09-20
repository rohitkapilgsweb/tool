import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiRequest } from "../../services/api";

export const createState = createAsyncThunk("createstate", async (data) => {
  console.log(data,'aaaaaaaaa')
  return apiRequest
    .post("location/createState", data)
    .then((res) => {
      if (res?.data?.success) {
        console.log(res, "nnnnnnnnn");
        // toast.success("state created successfuly");
      }
      return res;
    })
    .catch((err) => console.log(err));
});

export const getState = createAsyncThunk("getstate", async (data) => {
  return apiRequest
    .post("location/statelist",data)
    .then((res) => res)
    .catch((err) => {
      console.log(err)
      return err
    });
});

export const deleteState = createAsyncThunk("deleteState", async (id) => {
  return apiRequest
    .delete(`location/stateDelete/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
})

export const getStateById = createAsyncThunk("updateState", async (id) => {
  return apiRequest
    .get(`location/stateById/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
})

export const searchState = createAsyncThunk("searchState",async(data)=>{
  return apiRequest
  .post('location/statelist', data)
  .then((res)=>res)
  .catch((err)=>err);
});

export const editState = createAsyncThunk("editState", async (data) => {
  return apiRequest
    .post(`location/updateState`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err,'errrrrr'))
})
