import React, { useEffect } from "react";
import {  Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserList } from "../../redux/actions/user/userActions";
import AdminLoginPage from "../admin/login";

const HomeLayout = () => {
  const dispatch = useDispatch()
  const loginStatus = useSelector((state) => state.userSlice.loginStatus);

  useEffect(() => {
    if (loginStatus) dispatch(getAllUserList())
  }, [loginStatus])
  return (
    <>
      <div className="user_dashboard_bg">
        <Container>
          <Row>
     <AdminLoginPage/>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomeLayout;
