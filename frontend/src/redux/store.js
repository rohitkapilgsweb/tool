import { configureStore } from "@reduxjs/toolkit";
import LoginDetailsReducer from './reducer/LoginSice';
import UserLoginReducer from './reducer/userLogin';
import TelegramTokenReducer from './reducer/getTelegramTokenSlice';
import GetFacebookSliceReducer from './reducer/getDataSlice';
import addFacebookSliceReducer from './reducer/facebookSlice';
import GooglePlaceSearchReducer from './reducer/GooglePlaceSearch';
import BusinessListingReducer from './reducer/BusinessListing';
import TelegramTokensReducer from './reducer/saveTelegramToken';
import getPagesReducer from './reducer/GetFacebookPage';
import userReducer from './reducer/user';
import WhatsappReqReducer from './reducer/WhatsappReq';
import UpdateSliceReducer from './reducer/UpdateSlice';
import GetPlansSliceReducer from './reducer/GetPlansSlice'
import updatePlanssReducer from './reducer/UpdatePlansSlice';
import DeletePlanReducer from './reducer/DeletePlan';
import singlePlansReducer from './reducer/singlePlans';
import getAllPostsReducer from './reducer/GetFacebookPost'

const store = configureStore({
  reducer: {
    login: LoginDetailsReducer,
    UserLogin: UserLoginReducer,
    getTelegramToken: TelegramTokenReducer,
    addFacebookAccount: addFacebookSliceReducer,
    GetFacebookAccount: GetFacebookSliceReducer,
    GooglePlaceSearch: GooglePlaceSearchReducer,
    BusinessListings : BusinessListingReducer,
    saveTelegramToken : TelegramTokensReducer,
    getPages: getPagesReducer,
    users:userReducer,
    whatsappReqStore: WhatsappReqReducer,
    updateUser: UpdateSliceReducer,
    getPlans:GetPlansSliceReducer,
    updatePlans: updatePlanssReducer,
    DeletePlanItem: DeletePlanReducer,
    singlePlan: singlePlansReducer,
    getPosts: getAllPostsReducer,
  },
});

export default store;