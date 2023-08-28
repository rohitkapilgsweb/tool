import { configureStore } from "@reduxjs/toolkit";
import LoginDetailsReducer from './reducer/LoginSice';
import UserLoginReducer from './reducer/userLogin';
import TelegramTokenReducer from './reducer/getTelegramTokenSlice'

const store = configureStore({
  reducer: {
    login: LoginDetailsReducer,
    UserLogin: UserLoginReducer,
    getTelegramToken: TelegramTokenReducer
  },
});

export default store;