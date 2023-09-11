import React, { useState } from "react";
import { BsFillFileEarmarkPostFill, BsTelegram } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getUserId } from "../../utils/auth";
function Sidebar() {
  const role = getUserId() ? getUserId()?.role : null;
  const Location  = useLocation().pathname  ;
  console.log(Location)
  return (
    <aside className="left-sidebar">
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link to="/" className="text-nowrap logo-img">
            <img
              src="https://gswebtech.in/gswebtech.in/assets/img/site-logo.png"
              width="180"
              alt=""
            />
          </Link>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i className="ti ti-x fs-8"></i>
          </div>
        </div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            {!role === "tempuser" ? (
              <>
                <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Home</span>
                </li>
                <li className="sidebar-item">
                  <Link
                    className={`sidebar-link `}
                    to="/dashboard"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Post Managment</span>
                </li>
                <li className="sidebar-item">
                  <Link
                    className="sidebar-link"
                    to="/create_post"
                    aria-expanded="false"
                  >
                    <span>
                      <BsFillFileEarmarkPostFill size={23} />
                    </span>
                    <span className="hide-menu">Create Post</span>
                  </Link>
                </li>
                <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Automations</span>
                </li>
                <li className="sidebar-item">
                  <Link
                    className="sidebar-link"
                    to="/google"
                    aria-expanded="false"
                  >
                    <span>
                      <FcGoogle size={23} />
                    </span>
                    <span className="hide-menu">Google</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    className="sidebar-link"
                    to="/telegram"
                    aria-expanded="false"
                  >
                    <span>
                      <BsTelegram color="#0088cc" size={23} />
                    </span>
                    <span className="hide-menu">Telegram</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    className="sidebar-link"
                    to="/whatsapp"
                    aria-expanded="false"
                  >
                    <span>
                      <IoLogoWhatsapp color="#075e54" size={23} />
                    </span>
                    <span className="hide-menu">Whatsapp</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    className="sidebar-link"
                    to="/facebook"
                    aria-expanded="false"
                  >
                    <span>
                      <BsFacebook color="#1877F2" size={23} />
                    </span>
                    <span className="hide-menu">Facebook</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
               <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Home</span>
                </li>
                <li className="sidebar-item">
                  <Link
                    className={`sidebar-link ${Location === "/dashboard" ? "active-menu" :""}`}
                    to="/dashboard"
                    aria-expanded="false"
                  >
                    <span>
                      <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Welcome</span>
                  </Link>
                </li>
                <li className="nav-small-cap">
                  <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                  <span className="hide-menu">Automations</span>
                </li>
                <li className="sidebar-item">
                  <Link
                    className={`sidebar-link ${Location === "/google" ? "active-menu" :""}`}
                    to="/google"
                    aria-expanded="false"
                  >
                    <span>
                      <FcGoogle size={23} />
                    </span>
                    <span className="hide-menu">Google</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    className={`sidebar-link ${Location === "/telegram" ? "active-menu" :""}`}
                    to="/telegram"
                    aria-expanded="false"
                  >
                    <span>
                      <BsTelegram color="#0088cc" size={23} />
                    </span>
                    <span className="hide-menu">Telegram</span>
                  </Link>
                </li>
              </>
            )}

            {/* <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">AUTH</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/" aria-expanded="false">
              <span>
                <i className="ti ti-login"></i>
              </span>
              <span className="hide-menu">Log out</span>
            </Link>
          </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
