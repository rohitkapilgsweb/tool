import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
const DashboardLayout = () => {
  const tokensss = localStorage.getItem('accessToken')
  return tokensss ? (
    <>
    {/* <Navbar/> */}
    <Outlet />
    </>
  ) : (
   <>
    <Navigate to="/login" />
  </>
  );
};

export default memo(DashboardLayout);