import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";


export const commonFilterForPost = createAsyncThunk('Organisation-Post/Common-Filters',
    async (body) => {
        const apiCalls = {
            department: apiRequest.post("/mainStream/streamList"),
            eligibility: apiRequest.post("masterFilter/masterFilterList?types=eligibility"),
        }
        const apiData = Promise.all(Object.entries(apiCalls).map(([apiName, apiCall]) => {
            return apiCall
                .then(callResponse => ({ [apiName]: callResponse.data.data.rows }))
        }))
            .then(responseResult => {
                const responseData = Object.assign({}, ...responseResult)
                return responseData
            })
            .catch(error => {
                console.log(error, 'eror')
            })

        return apiData

    }
)

export const getFiltersForJobPost = createAsyncThunk('Organisation-Post/Department-List',
    async (body) => {
        const apiCalls = {
            state: apiRequest.post("/location/statelist"),
            organization: apiRequest.post("/organisation/organisationList"),
            jobRole: apiRequest.post("/masterFilter/masterFilterList?types=jobrole"),
        };
        const apiData = Promise.all(Object.entries(apiCalls).map(([apiName, apiCall]) => {
            return apiCall
                .then(callResponse => ({ [apiName]: callResponse.data.data.rows }));
        }))
            .then(responseResult => {
                const responseData = Object.assign({}, ...responseResult);
                return responseData
            })
        return apiData
    }
)

export const getFilterForQuestionPost = createAsyncThunk("Organisation-Post/Question-Post-Fitler",
    async (body) => {
        const apiCalls = {
            organization: apiRequest.post("/organisation/organisationList"),
            college: apiRequest.post("/college/popularCollegeList"),
            course: apiRequest.post("/Course/courselist"),
            exam: apiRequest.post("/Exam/examlist"),
            corporate: apiRequest.post("/corporate/corporateList"),
        }
        const apiData = Promise.all(Object.entries(apiCalls).map(([apiName, apiCall]) => {
            return apiCall
                .then(callResponse => ({ [apiName]: callResponse.data.data.rows }))
        }))
            .then(responseResult => {
                const responseData = Object.assign({}, ...responseResult)
                return responseData
            })
        return apiData
    }
)

export const addOrganisationPost = createAsyncThunk('Organisation-Post/Add',
    async (body) => {
        const apiData = await apiRequest.post('auth/addUserPost', body)
        return apiData.data
    }
)

export const cityByStateIdForPost = createAsyncThunk('Organisation/Post/Cities-By-State',
    async (body) => {
        const apiData = await apiRequest.post('/location/citydropdown', body)
        return apiData.data
    }
)

export const subStreamByMainStreamForPost = createAsyncThunk('Organisation/Post/SubStreams-By-MainStreams',
    async (body) => {
        const apiData = await apiRequest.post('subStream/subStreamList', body)
        return apiData.data
    }
)

export const associateCourseByCollege = createAsyncThunk("Organisation-Post/Course-By-Colleg",
    async (body) => {
        const apiData = await apiRequest.post('/college/popularCollegeList', body)
        return apiData.data.data.rows[0]
    })