import { createSlice } from "@reduxjs/toolkit";
import { CollegeLikes, CollegeLikesList, getCollegebyId, getColleges, getPopularCollege } from "../../actions/college/college";

const collegeListSlice = createSlice({
    name: "collegelist",
    initialState: {
        collegelistvalue: 0,
        isLoading: false,
        collegelist: [],
        collegelistStatus: "",
        collegebyIdvalue: 0,
        college: [],
        collegeStatus: "",
        collegeLikes: "",
        collegeListLikes: [],
        colllegeLikesStatus: "",
        popularCollegeList: [],
        popularCollegeListStaus: ''
    },
    extraReducers: (builder) => {
        builder.addCase(getColleges.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(getColleges.rejected, (state, action) => {
            state.isLoading = false
            state.collegelistStatus = action?.status?.message;
        });
        builder.addCase(getColleges.fulfilled, (state, action) => {
            state.collegelist = action?.payload?.data?.data
            state.isLoading = false
        });
        builder.addCase(getCollegebyId.pending, (state, action) => {
            // state.isLoading = true
        });
        builder.addCase(getCollegebyId.rejected, (state, action) => {
            state.college = [];
            state.isLoading = false
            state.collegeStatus = action?.status?.message;
        });
        builder.addCase(getCollegebyId.fulfilled, (state, action) => {
            state.college = action?.payload?.data?.data
            state.collegeStatus = "";
            state.isLoading = false
        });
        builder.addCase(CollegeLikes.fulfilled, (state, action) => {
            state.collegeListLikes = action?.payload?.data?.data
            state.collegeLikes = "";
        });
        builder.addCase(CollegeLikesList.rejected, (state, action) => {
            state.collegeListLikes = [];
            state.colllegeLikesStatus = action?.status?.message;
        });
        builder.addCase(getPopularCollege.fulfilled, (state, action) => {
            state.popularCollegeList = action?.payload?.data?.data
            state.popularCollegeListStaus = "";
            state.isLoading = false
        });
    },
});

export default collegeListSlice.reducer;
