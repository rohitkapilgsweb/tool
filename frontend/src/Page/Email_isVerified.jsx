import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { EmailVerification } from "../redux/actions/LoginAction";

function Email_isVerified() {
    const [isVeryfied,setIsVeryfied] = useState()
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (params?.token) {
      dispatch(EmailVerification(params?.token)).then((res) => {
        if (res?.payload?.status === true) {
          alert("Email Hasbeen verifyid");
          setIsVeryfied(true)
        }else{
          setIsVeryfied(false)
        }
      });
    }
  }, []);
  return <div>{params?.token && isVeryfied ? "Email is verified!" :  <Navigate to="/" />}</div>;
}

export default Email_isVerified;
