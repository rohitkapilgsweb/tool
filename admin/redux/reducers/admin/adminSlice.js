import { createSlice } from "@reduxjs/toolkit";
import { collegeApprovalList } from "../../actions/auth";
import { getUserTypeList } from "../../adminmanagement/admin";

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
        isLoading: false,
        pendingApprovalList:[], 
        pendingApprovalStatus:"",
        approvalList: []
    },
    extraReducers: (builder) => {
        builder.addCase(collegeApprovalList.pending, (state, action) => {
            state.isLoading = true

        });
        builder.addCase(collegeApprovalList.rejected, (state, action) => {
            state.isLoading = false
            state.pendingApprovalStatus = action?.status?.message;
        });
        builder.addCase(collegeApprovalList.fulfilled, (state, action) => {
            state.pendingApprovalList = action?.payload?.data?.data
            state.isLoading = false
        });

        builder.addCase(getUserTypeList.pending, (state, action) => {
            // state.isLoading = true
        });
        builder.addCase(getUserTypeList.fulfilled, (state, action) => {
            state.approvalList = action?.payload?.data
            // state.isLoading = false
        });
     }
})

export default adminSlice.reducer;