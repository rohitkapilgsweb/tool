import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Page/Components/Navbar";
import Sidebar from "../Page/Components/Sidebar";
import { ToastContainer } from "react-toastify";
const DashboardLayout = () => {
  const tokensss = localStorage.getItem('token')
  return tokensss ? (
    <>
    {/* <Navbar/> */}
    <ToastContainer/>
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
<Sidebar/>
    <div className="body-wrapper">
   <Navbar/>
  <div className="screen-preant">
  <Outlet />
  </div>
    </div>
  </div>
    </>
  ) : (
   <>
    <Navigate to="/login" />
  </>
  );
};

export default memo(DashboardLayout);