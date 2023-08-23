import { configureStore } from "@reduxjs/toolkit";
import LoginDetailsReducer from './reducer/LoginSice'

const store = configureStore({
  reducer: {
    login: LoginDetailsReducer
  },
});

export default store;