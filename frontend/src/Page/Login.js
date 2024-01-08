import React, { useState } from "react";
import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import { LoginActions, userLoginAction } from "../redux/actions/LoginAction";
import Loader from "./Components/Loader";
import { toast } from "react-toastify";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [logedIn, setLogedIn] = useState(false)
  const [googleLoginToken, setGoogleLoginToken] = useState(null)

  const isLoading = useSelector((state) => state?.UserLogin?.isLoading);
  const notify = (msg) => toast(msg);
  const onSubmit = async (values) => {
    dispatch(userLoginAction(JSON.stringify(values))).then((res) => {
      let success = res?.payload?.success;
      let status = res?.payload?.status;
      if (success === true) {
        if (res.meta.requestStatus === "fulfilled") {
          localStorage.setItem("token", res.payload.access_token);
          navigate("/");
          window.location.reload();
        }
      } else {
        if (success === false && !status) {
          let msg = "User Not Registered";
          notify(msg);
        } else if (success === false && status) {
          let msg = "Wrong Password";
          notify(msg);
        }
      }
    });
  };

  
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div className="bg-login">
      {isLoading && <Loader />}
      <Container>
        <div className="new_google_form text-center">
          <Row className=" new_google_form d-flex align-items-center justify-content-center ">
            <Col sm={4} className="new_form ">
             <div className="google-btn">
           
             </div>
              <Form
              validate={validate}
                onSubmit={onSubmit}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                

                    <Col sm={12} className="mb-4">
                      <Field
                        name="email"
                      >
                         {({ input, meta }) => (
                         <>
                          <input {...input} placeholder="Email" type="email" className="form-control" />
                          {meta.touched && meta.error && (
                            <span className="d-block text-start text-danger mt-2">{meta.error}</span>
                          )}
                          </>
                         )}
                        </Field>
                    </Col>

                    <Col sm={12} className="mb-4">
                      <Field
                        name="password"
                        component={"input"}
                      >
                          {({ input, meta }) => (
                         <>
                          <input {...input} placeholder="Password" type="password" className="form-control" />
                          {meta.touched && meta.error && (
                            <span className="d-block text-start text-danger mt-2">{meta.error}</span>
                          )}
                          </>
                         )}
                        </Field>
                    </Col>
                    

                    <Col sm={{ span: 12 }}>
                      <button
                        className="w-100 bg-black btn text-white"
                        type="submit"
                        disabled={submitting || pristine}
                      >
                        Sign in
                      </button>
                    </Col>

                    <Col sm={{ span: 12 }} className="py-3 text-center">
                      <Link className="new_link_a" to="/resetpassword">
                        {" "}
                        Reset password{" "}
                      </Link>
                    </Col>
                    <Col sm={{ span: 12 }} className=" text-center">
                      <p className="new_link_a mb-0">
                        {" "}
                        No account?{" "}
                        <span>
                          <Link to="/register">Create one</Link>
                        </span>{" "}
                      </p>
                    </Col>
                  </form>
                )}
              />
            </Col>
          </Row>
        </div>
      </Container>

      
    </div>
  );
}

export default Login;
