import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNav } from "../../../redux/reducers/User/userSlice";

const LeftMenuPage = () => {
  const adminNavBar = require("./leftmenuData.json");

  const router = useRouter();
  const { pathname } = router

  const activeNavItem = useSelector((state) => state.userSlice.activeNavItem);
  const dispatch = useDispatch();
  useEffect(() => {
    checkRoute();
  }, [router.pathname]);
  function checkRoute() {
    adminNavBar.forEach((NavItem) => {
      NavItem.other.map((ele) => {
        if (pathname.includes(ele)) {
          dispatch(setActiveNav(NavItem.name));
        }
      });
    });
  }
  const handleActive = (path) => {
    router.push(`/admin/${path}`);
  };
  return (
    <>
      <div className="leftmenu">
        <Image width={80} height={40} src="/images/bharat-logo.svg" />
        {adminNavBar?.map((navItem, index) => {
          return (
            <div
              key={index}
              onClick={() => handleActive(navItem.path)}
              className={
                navItem.name === activeNavItem ?
                  "leftmenu_btn active"
                  : "leftmenu_btn"
              }
            >
              <Image
                className="admin_leftmenu_btn_icon"
                src={navItem.name === activeNavItem ? navItem.whitelogo : navItem.logo}
              />
              <h6
                className={
                  navItem.name === activeNavItem
                    ? "leftmenu_tabs_name white_font"
                    : "leftmenu_tabs_name"
                }
              >
                {navItem.name}
              </h6>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LeftMenuPage;
