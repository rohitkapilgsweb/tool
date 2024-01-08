import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useDispatch } from 'react-redux';
import { LoginActions } from '../redux/actions/LoginAction';
import { toast } from "react-toastify";
import { IoMdMailUnread } from "react-icons/io";
function Createone() {
  const[regMenu, setRegMenu]  = useState(false)
  const[sendEmail, setSendEmail]  = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async values => {
    setSendEmail(values?.email)
   dispatch(LoginActions(JSON.stringify(values)))
   .then((res)=>{
    if(res?.payload?.msg ==="Registration Success"){
      setRegMenu(true)
      toast(res?.payload?.msg)
      // navigate('/')
      // window.location.reload() 
     }else(
      toast(res?.payload?.email[0])
     )
   })
  
  }

    
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div className="bg-login ">
      <Container>
        <div className="new_google_form text-center">
          <Row className=" new_google_form d-flex align-items-center justify-content-center ">
            {regMenu === false ? 
            <Col sm={4} className="new_form ">
            <h1 className="mb-3">REGISTER</h1>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                   <Col sm={12} className="mb-4">
                    <Field
                        name="name"
                        component="input"
                      >
                          {({ input, meta }) => (
                         <>
                          <input {...input} placeholder="Name" type="text" className="form-control" />
                          {meta.touched && meta.error && (
                            <span className="d-block text-start text-danger mt-2">{meta.error}</span>
                          )}
                          </>
                         )}
                        </Field>
                      </Col>
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
                     <button  className="w-100 bg-black btn text-white" type="submit" disabled={submitting || pristine}>
                      Submit
                    </button>
                    </Col>
                  <Col sm={{ span: 12 }} className="py-3 text-center">
                    <Link className=" new_link_a" to="/resetpassword">
                      {" "}
                      Reset password{" "}
                    </Link>
                  </Col>
                  <Col sm={{ span: 12 }} className="pb-3 text-center">
                    <p className="mb-0 new_link_a">
                      <span>
                        <Link to="/login">Login</Link>
                      </span>{" "}
                    </p>
                  </Col>
                </form>
              )}
            />
            </Col> :  <Col sm={6} className="new_form ">
            <IoMdMailUnread size={60} color="#34b475" />
            <h3>Please verify your email</h3>
            You're almost there! We sent an email to <br />
                 <b> {sendEmail ? sendEmail :"exmaple.com"}</b>

                 <p className="mt-3">Just Click on the link in that email to complete your Signup.
If you don't see it, you may need to check your spam folder.</p>

<Link to={"/login"} className="btn hero-body">Go To Login</Link>
            </Col> }

          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Createone;
