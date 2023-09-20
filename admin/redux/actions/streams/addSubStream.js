import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

export const CreateSubStream = createAsyncThunk("addsubstream", async (data) => {
  return apiRequest
    .post("subStream/addSubStream", data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
);

export const getSubStream = createAsyncThunk("getsubstream", async (body) => {
  return apiRequest
    .post("subStream/subStreamList",body)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

// substream action with body
export const getSubstreamData = createAsyncThunk("getSubstreamData/subStream/subStreamList", async(data) => {
  return apiRequest 
  .post("subStream/subStreamList", data)
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log(err);
    return err;
  });
});


export const deleteSubStream = createAsyncThunk("deleteSubStream", async (id) => {
  return apiRequest
    .delete(`subStream/subStreamDelete/${id}`)
    .then((res) => res)
    .catch((err) => err)
})

export const getSubStreamById = createAsyncThunk("getSubStreamById", async (id) => {
  return apiRequest
    .get(`subStream/subStreamById/${id}`)
    .then((res) => res)
    .catch((err) => err)
})

export const editSubStream = createAsyncThunk("editSubStream", async (data) => {
  console.log(data)
  return apiRequest
    .post("subStream/updateSubStream", data)
    .then((res) => res)
    .catch((err) => err)
})