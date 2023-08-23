import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";


const LoginLayout = () => {
  const tokensss = localStorage.getItem("accessToken");

  return !tokensss ? (
    <>
    <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default memo(LoginLayout);