import { configureStore } from "@reduxjs/toolkit";
import LoginDetailsReducer from './reducer/LoginSice';
import UserLoginReducer from './reducer/userLogin';
import TelegramTokenReducer from './reducer/getTelegramTokenSlice'
import GetFacebookSliceReducer from './reducer/getDataSlice'
import addFacebookSliceReducer from './reducer/facebookSlice'

const store = configureStore({
  reducer: {
    login: LoginDetailsReducer,
    UserLogin: UserLoginReducer,
    getTelegramToken: TelegramTokenReducer,
    addFacebookAccount: addFacebookSliceReducer,
    GetFacebookAccount: GetFacebookSliceReducer
  },
});

export default store;