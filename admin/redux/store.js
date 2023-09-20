import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import cityListReducer from "./location/cityListSlice";
import countryListReducer from "./location/countryListSlice";
import stateListReducer from "./location/stateListSlice";
import signupReducer from "./signup/signupSlice";
import stateByIdReducer from "./location/getStateByIdSlice";
import cityByIdReducer from "./location/getCityByIdSlice";
import verifyOtpReducer from "./signup/verifyotpSlice";
import mainStreamReducer from "./streams/mainStreamSlice";
import subStreamReducer from "./streams/subStreamSlice";
import colStreamReducer from "./streams/colStreamSlice";
import mainStreamByIdReducer from "./streams/mainStreamByIdSlice";
import subStreamByIdReducer from "./streams/subStreamByIdSlice";
import colStreamByIdReducer from "./streams/colStreamByIdSlice";
import examListSliceReducer from "./reducers/exams/examListSlice";
import masterfilterReducer from "./reducers/masterFilterSlice/masterfilterSlice";
import masterFilterByIdReducer from "./reducers/masterFilterSlice/masterFilterByIdSlice";
import exambyidSliceReducer from "./reducers/exams/examListbyidSlice";
import masterFilterAllReducder from "./reducers/masterFilterSlice/masterFilterAllSlice";
import LoginUserReducer from "./signup/loginUserSlice";
import courseListReducer from "./reducers/courses/courselistSlice";
import coursebyIdReducer from "./reducers/courses/coursebyIdSlice";
import corporateReducer from "./reducers/corporate/corporatebySlice";
import collegelistReducer from "./reducers/colleges/collegelistSlice";
import corporateListReducer from "./reducers/corporate/addmaincategorybySlice";
import corporatesubcategoryReducer from "./reducers/corporate/addsubcategorybySlice";
import corporateMocktestReducer from "./reducers/corporate/mocktestcorporateSlice";
import sectorReducer from "./reducers/organisation/sectorBySlice"
import userSlice from "./reducers/User/userSlice";
import postSlice from "./reducers/organisation/postSlice";
import adminReducer from "./reducers/admin/adminSlice";
import postlistReducer from "./reducers/User/userSlice";
import commentListReducer from "./reducers/User/userSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice,
    postSlice: postSlice,
    signUp: signupReducer,
    loginUser: LoginUserReducer,
    verifyotp: verifyOtpReducer,
    countrylist: countryListReducer,
    stateList: stateListReducer,
    cityList: cityListReducer,
    stateById: stateByIdReducer,
    cityById: cityByIdReducer,
    mainStreamList: mainStreamReducer,
    subStreamList: subStreamReducer,
    colStreamList: colStreamReducer,
    mainStreamById: mainStreamByIdReducer,
    subStreamById: subStreamByIdReducer,
    colStreamById: colStreamByIdReducer,
    masterFilterList: masterfilterReducer,
    masterfilterByid: masterFilterByIdReducer,
    examList: examListSliceReducer,
    exambyid: exambyidSliceReducer,
    allMasterFilterList: masterFilterAllReducder,
    courseList: courseListReducer,
    coursebyId: coursebyIdReducer,
    corporateData: corporateReducer,
    collegelist: collegelistReducer,
    corporateCategory: corporateListReducer,
    corporateSubCategory: corporatesubcategoryReducer,
    corporateMocktest: corporateMocktestReducer,
    sectorData: sectorReducer,
    adminData: adminReducer,
    postlist: postlistReducer,
    // commentList: commentListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
