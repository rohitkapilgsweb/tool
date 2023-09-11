import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { useDispatch } from 'react-redux';
import { LoginActions } from '../redux/actions/LoginAction';
function Createone() {

  const dispatch = useDispatch()
 const navigate = useNavigate()

  const onSubmit = async values => {
   dispatch(LoginActions(JSON.stringify(values)))
   .then((res)=>{
    if(res?.payload?.success){
      navigate("/")
     }
   })
  
  }

  return (
    <div className="bg-login">
      <Container>
        <div className="new_google_form text-center">
          <Row className=" new_google_form d-flex align-items-center justify-content-center ">
            <Col sm={4} className="new_form ">
              <h1 className="mb-3">REGISTER</h1>
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                  <form onSubmit={handleSubmit}>
                      <Col sm={12} className="mb-4">
                        <Field
                          className="form-control"
                          name="email"
                          component="input"
                          type="email"
                          placeholder="Email"
                        />
                     
                      </Col>
                      <Col sm={12} className="mb-4">
                      <Field
                          className="form-control"
                          name="password"
                          component="input"
                          type="password"
                          placeholder="Create Password"
                        />
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
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Createone;
