import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const LoginLayout = () => {
  const tokensss = localStorage.getItem("token");

  return !tokensss ? (
    <>
     <ToastContainer/>
    <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default memo(LoginLayout);