import { createSlice } from "@reduxjs/toolkit";
import { addOrganisationPost, associateCourseByCollege, cityByStateIdForPost, commonFilterForPost, getFilterForQuestionPost, getFiltersForJobPost, subStreamByMainStreamForPost } from "../../actions/organisation/postActions";

const initialState = {
    postFilterList: {
        eligibility: [],
        department: [],
        subDepartment: [],
        state: [],
        city: [],
        jobRole: [],
        organization: [],
        college: [],
        course: [],
        exam: [],
        corporate: []
    },
    creatingPost: false,
    addedPost: {},
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(commonFilterForPost.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, ...action.payload }
            state.creatingPost = false
        })

        builder.addCase(getFiltersForJobPost.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, ...action.payload }
            state.creatingPost = false
        })

        builder.addCase(getFilterForQuestionPost.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, ...action.payload }
            state.creatingPost = false
        })

        builder.addCase(addOrganisationPost.fulfilled, (state, action) => {
            state.addedPost = action.payload
            state.creatingPost = false
        })
        builder.addCase(addOrganisationPost.pending, (state, action) => {
            state.creatingPost = true
        })
        builder.addCase(addOrganisationPost.rejected, (state, action) => {
            state.creatingPost = false
        })

        builder.addCase(cityByStateIdForPost.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, city: action.payload.result }
        })

        builder.addCase(subStreamByMainStreamForPost.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, subDepartment: action.payload.data.rows }
        })
        
        builder.addCase(associateCourseByCollege.fulfilled, (state, action) => {
            state.postFilterList = { ...state.postFilterList, course: action.payload.AssociateCourse }
        })
    }
})

export default postSlice.reducer