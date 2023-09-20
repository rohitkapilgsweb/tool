import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCountry } from "../../../redux/actions/location/countryList";
import {
  createState,
  editState,
  getStateById,
} from "../../../redux/actions/location/createState";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

function AddStatePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((data) => data?.stateById?.state?.data);
  const initialdata = () => {
    let initialValue = {};
    if (router.query.Id) {
      initialValue = {
        countryId: `${state?.result?.Countries?.id}`,
        state: [{ state: state?.result?.state, id: state?.result?.id }],
      };
    } else {
      initialValue = {
        countryId: "",
        state: [{ state: '' }],
      };
    }
    return initialValue;
  };
  const countryList = useSelector(
    (data) => data?.countrylist?.countrylist?.data?.data?.rows
  );

  useEffect(() => {
    dispatch(getCountry());
    initialdata();
    if (router.query.Id) {
      const stateId = router.query.Id;
      dispatch(getStateById(stateId));
    }
  }, [router.query.Id]);

  const handleSubmit = (values) => {
    // const data = { state: [values] };
    let updatedData = {};
    if (!router.query.Id) {
      let data = { state: [] }
      data.state = values.state.map((item, index) => {
        return {
          countryId: values?.countryId,
          state: item?.state
        }
      })
      dispatch(createState(data)).then((res) => {
        if (res?.payload?.data?.success) {
          const status = res?.payload?.data?.data?.state[0]?.status;
          if (status == "duplicate") {
            toast.error(`State is ${status}`);
          } else {
            toast.success("State created successfuly");
          }
          router.push("/admin/location");
        }
      });
    } else {
      updatedData = {
        state: [
          {
            state: values?.state[0]?.state,
            id: values?.state[0]?.id,
          }
        ]
      }
      dispatch(editState(updatedData)).then((res) => {
        if (res?.payload?.data?.success) {
          toast.success("Done");
          router.push("/admin/location");
        } else {
          toast.error('Error');
        }
      });
    }
  };

  const validate = (values) => {
    let errors = {};
    let itemArray = []
    if (!values.countryId) {
      errors['countryId'] = "*"
    }
    values?.state?.map((item, index) => {
      let error = {}
      if (!item?.state) {
        error['state'] = '*'
      }
      itemArray.push(error)
      errors['state'] = itemArray
    })
    console.log(errors)
    return errors;
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        validate={validate}
        mutators={...arrayMutators}
        initialValues={useMemo(() => initialdata(), [state])}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Row className="padding_top mt-3">
              <Col lg={6} md={12}>

                <Field name="countryId">
                  {({ input, meta }) => (
                    <>
                      <div className="d-flex">
                        <label className="signup_form_label">Country Name</label>
                        {meta.error && meta.touched && (
                          <span className="text-danger required_msg">
                            {meta.error}
                          </span>
                        )}
                      </div>
                      <select
                        {...input}
                        className="form-control select-style signup_form_input "
                        disabled={router.query.Id ? true : false}
                      >
                        {!router.query.Id && <option value="">Select</option>}
                        {countryList &&
                          countryList?.map((item) => (
                            <option value={item.id}>{item.name}</option>
                          ))}
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
              <Col lg={6} md={12} className="">

                <FieldArray name="state">
                  {({ fields }) => (
                    <>
                      {fields.map((name, index) => (
                        <div className="d-flex">
                          <Field name={`${name}.state`}>
                            {({ input, meta }) => (
                              <div className="w-100">
                                <div className="d-flex">
                                  {index === 0 && <label className="signup_form_label">State Name</label>}
                                  {meta.error && meta.touched && (
                                    <span className="text-danger required_msg">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>

                                <input
                                  {...input}
                                  className="form-control select-style signup_form_input margin_bottom"
                                  placeholder="Enter State" />
                              </div>
                            )}
                          </Field>
                          <div className={index === 0 ? 'd-flex m_top_30' : 'd-flex'}>
                            {!router.query.Id && (
                              <div
                                type='button'
                                className='add_remove_btn'
                                onClick={() =>
                                  fields.push({ state: '' })
                                }
                              >
                                <img
                                  className='add_remove_icon'
                                  src='/images/plus.png'
                                />
                              </div>
                            )}
                            {fields.length > 1 ? (
                              <div
                                className='add_remove_btn'
                                type='button'
                                onClick={() => fields.remove(index)}
                              >
                                <img
                                  className='add_remove_icon'
                                  src='/images/minus.png'
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
                {/* <Field
                  name="state"
                  component="input"
                  className="form-control select-style signup_form_input margin_bottom"
                  placeholder="Enter State"
                /> */}
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <button className="admin_signup_btn m-2" type="submit">
                  {!router.query.Id ? "Submit" : "Update"}
                </button>
              </Col>
            </Row>
          </form>
        )}
      />
    </>
  );
}

export default AddStatePage;
