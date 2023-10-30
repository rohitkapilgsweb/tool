import React from "react";
import { Link } from "react-router-dom";
import GoogleAuthorize from 'react-google-authorize';
import { hasGrantedAllScopesGoogle, useGoogleLogin } from "@react-oauth/google";
function Dashboard() {


  const login = useGoogleLogin({
    onSuccess: async tokenResponse  => {console.log(tokenResponse)},
    // onSuccess: codeResponse => console.log(codeResponse),
    // flow: 'auth-code',
    scope: "https://www.googleapis.com/auth/business.manage"
  });


  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-lg-8 d-flex align-items-strech">
        <button onClick={() => login()}>
  Sign in with Google 🚀{' '}
</button>;
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
