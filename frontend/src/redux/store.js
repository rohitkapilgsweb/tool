import { configureStore } from "@reduxjs/toolkit";
import LoginDetailsReducer from './reducer/LoginSice';
import UserLoginReducer from './reducer/userLogin';
import TelegramTokenReducer from './reducer/getTelegramTokenSlice'
import GetFacebookSliceReducer from './reducer/getDataSlice'
import addFacebookSliceReducer from './reducer/facebookSlice'
import GooglePlaceSearchReducer from './reducer/GooglePlaceSearch'
import BusinessListingReducer from './reducer/BusinessListing'
import TelegramTokensReducer from './reducer/saveTelegramToken'

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
  },
});

export default store;