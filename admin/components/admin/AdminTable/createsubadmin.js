import React from "react";
import { Col, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";

function CreateSubadmin() {
  const handleSubmit = (values) => {
    console.log(values, "val");
  };
  const validate = (values) => {
    let errors = {};
    if (!values.Category) {
      errors["Category"] = "*";
    }
    if (!values.SubCategory) {
      errors["SubCategory"] = "*";
    }
    if (!values.Field) {
      errors["Field"] = "*";
    }
    if (!values.Email) {
      errors["Email"] = "*";
    }
    return errors;
  };
  return (
    <>
      <Row className="padding_top">
        <Col>
          <div className=" ps-2">
            <h4 className="table_list_heading master_heading">Sub Admin</h4>
          </div>
          <hr />
        </Col>
      </Row>
      <Form
        onSubmit={handleSubmit}
        validate={validate}
        initalValues={{
          Category: "",
          SubCategory: "",
          Field: "",
          Email: "",
        }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6} md={12}>
                <Field name="Category">
                  {({ input, meta }) => (
                    <>
                      <div className="d-flex">
                        <label className="signup_form_label">
                          Select Category
                        </label>
                        {meta.error && meta.touched && (
                          <span className="text-danger required_msg">
                            {meta.error}
                          </span>
                        )}
                      </div>
                      <select
                        {...input}
                        className="form-control select-style signup_form_input"
                      >
                        <option values="">Select Category</option>
                        <option>Category 1</option>
                        <option>Category 2</option>
                      </select>
                      <div className="text-end">
                        <img
                          className="select_down_icon"
                          src="/images/down.png"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </Col>
              <Col lg={6} md={12}>
                <Field name="SubCategory">
                  {({ input, meta }) => (
                    <>
                      <div className="d-flex">
                        <label className="signup_form_label">
                          Select Sub Category
                        </label>
                        {meta.error && meta.touched && (
                          <span className="text-danger required_msg">
                            {meta.error}
                          </span>
                        )}
                      </div>
                      <select
                        {...input}
                        className="form-control select-style signup_form_input"
                      >
                        <option values="">Select Sub Category</option>
                        <option>Sub Category 1</option>
                        <option>Sub Category 2</option>
                      </select>
                      <div className="text-end">
                        <img
                          className="select_down_icon"
                          src="/images/down.png"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={12}>
                <Field name="Field">
                  {({ input, meta }) => (
                    <>
                      <div className="d-flex">
                        <label className="signup_form_label">
                          Select Field
                        </label>
                        {meta.error && meta.touched && (
                          <span className="text-danger required_msg">
                            {meta.error}
                          </span>
                        )}
                      </div>
                      <select
                        {...input}
                        className="form-control select-style signup_form_input"
                      >
                        <option values="">Select Field</option>
                        <option>Field 1</option>
                        <option>Field 2</option>
                      </select>
                      <div className="text-end">
                        <img
                          className="select_down_icon"
                          src="/images/down.png"
                        />
                      </div>
                    </>
                  )}
                </Field>
              </Col>
              <Col lg={6} md={12}>
                <Field name="Email">
                  {({ input, meta }) => (
                    <>
                      <div className="d-flex">
                        <label className="signup_form_label">
                          Enter E-mail
                        </label>
                        {meta.error && meta.touched && (
                          <span className="text-danger required_msg">
                            {meta.error}
                          </span>
                        )}
                      </div>
                      <input
                        {...input}
                        type="Email"
                        className="form-control select-style signup_form_input"
                        placeholder="Enter Email"
                      />
                    </>
                  )}
                </Field>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <button className="admin_signup_btn" onClick={handleSubmit}>
                  Allow Access
                </button>
              </Col>
            </Row>
          </form>
        )}
      />
    </>
  );
}

export default CreateSubadmin;
