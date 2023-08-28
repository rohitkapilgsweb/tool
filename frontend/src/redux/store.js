import { configureStore } from "@reduxjs/toolkit";
import LoginDetailsReducer from './reducer/LoginSice';
import UserLoginReducer from './reducer/userLogin';

const store = configureStore({
  reducer: {
    login: LoginDetailsReducer,
    UserLogin: UserLoginReducer
  },
});

export default store;