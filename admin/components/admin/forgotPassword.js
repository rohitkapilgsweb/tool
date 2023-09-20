import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { forgetPassword, updatePassword } from "../../redux/actions/auth";
import { Field, Form } from "react-final-form";
import { toast } from "react-toastify";

function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formStep, setFormStep] = useState(0);

  const onSubmit = (values) => {
    const otp = values.OTP1 + values.OTP2 + values.OTP3 + values.OTP4;
    if (formStep === 0) {
      dispatch(forgetPassword(values.email)).then((response) => {
        if (
          response?.payload?.status === 200 &&
          response.payload?.data?.success === true
        ) {
          setFormStep(1);
        } else {
          toast.info(response?.payload?.data?.message);
        }
      });
    }
    if (formStep === 1) {
      dispatch(
        updatePassword({
          email: values?.email,
          password: values?.password,
        })
      ).then((response) => {
        if (
          response?.payload?.status === 200 &&
          response?.payload?.data?.success === true
        ) {
          toast.success(response?.payload?.data?.message, { autoClose: 2000 });
          router.push("/login");
        }
      });
    }
  };
  const formValidate = (values) => {
    const errors = {};
    var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (formStep === 0) {
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!emailPattern?.test(values.email)) {
        errors.email = "Invalid email address!";
      }
    } else if (formStep === 1) {
      if (!values?.email) {
        errors.email = "Email must be a valid email address!";
      }
      if (!values?.password) {
        errors.password = "Password is required!";
      }
      if (!values.conformPassword) {
        errors.conformPassword = " Confirmation password is required!";
      } else if (
        values.password &&
        values.conformPassword &&
        values.password !== values.conformPassword
      ) {
        errors.conformPassword = "Both passwords must match!";
      }
    }
    return errors;
  };
  return (
    <>
 <div className="login_bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 mobile_padding">
              <div className="text-center login_left_col">
                <img className="hcceco_logo" src="/images/bharat-logo.svg" />
                <p className="logo_sub_heading">FORGET PASSWORD</p>
                <img
                  className="img-fluid login_img"
                  src="images/login-img.svg"
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-12 mobile_padding">
              <div className="login_right_col">
              <Form
              onSubmit={onSubmit}
              validate={formValidate}
              render={({ handleSubmit, values }) => (
                <form
                  onSubmit={handleSubmit}
                  className=" login_form"
                >
                  {formStep === 0 && (
                    <Field name="email">
                      {({ input, meta }) => (
                        <div className="form-group m_top_f_p">
                          <label className="signup_form_label">Email</label>
                          <input
                            {...input}
                            type="text"
                            placeholder="Email"
                            className="login_input mt-0"
                          />
                          {meta.touched && meta.error && (
                            <span className=" text-danger alert-danger error_text">
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  )}
                  {formStep === 1 && (
                    <>
                      <Field name="email">
                        {({ input, meta }) => (
                          <div className="form-group m_top_f_p">
                            <label className="signup_form_label">Email</label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Email"
                              // className="login_input margin_bottom mt-0"
                              className={` ${
                                meta.touched && meta.error
                                  ? "login_input mt-0"
                                  : "login_input margin_bottom mt-0"
                              }`}
                            />
                            {meta.touched && meta.error && (
                              <span className=" text-danger alert-danger error_text">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="password">
                        {({ input, meta }) => (
                          <div className="form-group">
                            <label className="signup_form_label">
                              Password
                            </label>
                            <input
                              {...input}
                              type="password"
                              placeholder="Enter your password"
                              className={
                                meta.touched && meta.error
                                  ? "login_input mt-0"
                                  : "login_input margin_bottom  mt-0"
                              }
                            />
                            {meta.touched && meta.error && (
                              <span className=" text-danger alert-danger error_text">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="conformPassword">
                        {({ input, meta }) => (
                          <div className="form-group">
                            <label className="signup_form_label">
                              Confirm Password
                            </label>
                            <input
                              {...input}
                              type="password"
                              placeholder="Conform Password"
                              className="login_input  mt-0"
                            />
                            {meta.touched && meta.error && (
                              <span className=" text-danger  alert-danger error_text">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </>
                  )}
                  <div className="forgot_submit_btn_div">
                    <button
                      type="submit"
                      className="btn login_btn forgot_submit_btn"
                    >
                      SUBMIT
                    </button>
                  </div>
                  <div className="remember_row d-flex ">
                    <p className="login_paira mb-0 mobile_font_14">
                      You Remember Password?
                    </p>{" "}
                    <p className="sign_text mb-0" onClick={() => router.back()}>
                      {" "}
                      Sign In{" "}
                    </p>
                  </div>
                </form>
              )}
            />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="main_admin_login_bg main_forgot_bg">
        <Container>
          <div className="forgot_page">
            <Form
              onSubmit={onSubmit}
              validate={formValidate}
              render={({ handleSubmit, values }) => (
                <form
                  onSubmit={handleSubmit}
                  className=" forgot_form mx-auto my-auto"
                >
                  <h2 className="review_heading text-center mb-4 mt-0">
                    FORGET PASSWORD
                  </h2>
                  {formStep === 0 && (
                    <Field name="email">
                      {({ input, meta }) => (
                        <div className="form-group">
                          <label className="signup_form_label">Email</label>
                          <input
                            {...input}
                            type="text"
                            placeholder="Email"
                            className="login_input mt-0"
                          />
                          {meta.touched && meta.error && (
                            <span className=" text-danger alert-danger error_text">
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>
                  )}
                  {formStep === 1 && (
                    <>
                      <Field name="email">
                        {({ input, meta }) => (
                          <div className="form-group">
                            <label className="signup_form_label">Email</label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Email"
                              // className="login_input margin_bottom mt-0"
                              className={` ${
                                meta.touched && meta.error
                                  ? "login_input mt-0"
                                  : "login_input margin_bottom mt-0"
                              }`}
                            />
                            {meta.touched && meta.error && (
                              <span className=" text-danger alert-danger error_text">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="password">
                        {({ input, meta }) => (
                          <div className="form-group">
                            <label className="signup_form_label">
                              Password
                            </label>
                            <input
                              {...input}
                              type="password"
                              placeholder="Enter your password"
                              className={
                                meta.touched && meta.error
                                  ? "login_input mt-0"
                                  : "login_input margin_bottom  mt-0"
                              }
                            />
                            {meta.touched && meta.error && (
                              <span className=" text-danger alert-danger error_text">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="conformPassword">
                        {({ input, meta }) => (
                          <div className="form-group">
                            <label className="signup_form_label">
                              Conform Password
                            </label>
                            <input
                              {...input}
                              type="password"
                              placeholder="Conform Password"
                              className="login_input  mt-0"
                            />
                            {meta.touched && meta.error && (
                              <span className=" text-danger  alert-danger error_text">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </>
                  )}
                  <div className="forgot_submit_btn_div">
                    <button
                      type="submit"
                      className="btn login_btn forgot_submit_btn"
                    >
                      SUBMIT
                    </button>
                  </div>
                  <div className="remember_row d-flex ">
                    <p className="login_paira mb-0 mobile_font_14">
                      You Remember Password?
                    </p>{" "}
                    <p className="sign_text mb-0" onClick={() => router.back()}>
                      {" "}
                      Sign In{" "}
                    </p>
                  </div>
                </form>
              )}
            />
          </div>
        </Container>
      </div> */}
    </>
  );
}

export default ForgotPasswordPage;
