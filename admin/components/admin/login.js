import { useRouter } from "next/router";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function AdminLoginPage() {
  const router = useRouter();
  return (
    <div className="main_admin_login_bg">
      <Container>
        <Row>
          <Col className=" admin_login_form_bg ">
            <form className="admin_login_form">
              <Row>
                <Col lg={12} className="text-center">
                  <h2 className="admin_login_heading">SIGN IN TO MAIN ADMIN</h2>
                </Col>
              </Row>
              <input
                type="email"
                placeholder="Enter Email"
                className="login_input admin_login_input "
                required
                // value={loginData.email}
                // onChange={(e) =>
                //   setLoginData({ ...loginData, email: e.target.value })
                // }
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="login_input admin_login_input margin_bottom"
                required
                // value={loginData.password}
                // onChange={(e) =>
                //   setLoginData({ ...loginData, password: e.target.value })
                // }
              />
              <input type="checkbox" /> <label> Keep me signed in </label>
              <button type="submit" className="btn admin_login_form_btn">
                Login
              </button>
              <div className="text-center mt-3">
                <p
                  className="admin_forgot_link"
                  onClick={() => router.push("/admin/forgotpassword")}
                >
                  Forgot Password?
                </p>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminLoginPage;
