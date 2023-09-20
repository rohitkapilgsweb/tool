import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCity, editCity, getCityById } from "../../../redux/actions/location/createCity";
import { getState } from "../../../redux/actions/location/createState";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

function AddCityPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const city = useSelector(
    (data) => data?.cityById?.state?.data
  );
  const initialData = () => {
    let initialValue = {}
    if (router?.query?.Id) {
      initialValue = {
        // name: city?.result?.name,
        stateId: city?.result?.State?.id,
        city: [{ name: city?.result?.name, id: city?.result?.id }]
      }
    } else {
      initialValue = {
        // name: '',
        stateId: '',
        city: [{ name: '' }]
      }
    }
    return initialValue
  }
  const handleSubmit = (values) => {
    // const data = { city: [values] };
    let updatedData = {}
    if (!router.query.Id) {
      let data = { city: [] }
      data.city = values.city.map((item, index) => {
        return {
          name: item?.name,
          stateId: values?.stateId
        }
      })

      dispatch(createCity(data)).then((res) => {
        if (res?.payload?.data?.success) {
          const status = res?.payload?.data?.data?.city[0]?.status;
          if (status == "duplicate") {
            toast.error(`City is ${status}`, { autoClose: 1000 });
          } else {
            toast.success("city added successfuly", { autoClose: 1000 });
          }
          router.push("/admin/location");
        }
      });
    } else {
      updatedData = {
        city: [
          {
            name: values?.city[0].name,
            id: city?.result?.id
          }
        ]
      }
      dispatch(editCity(updatedData)).then((res) => {
        console.log(res, 'rddddddddd')
        if (res?.payload?.data?.success) {
          toast.success("Updated")
          router.push("/admin/location")
        } else {
          alert('errrrrr')
        }
      })
    }
  };
  const stateList = useSelector(
    (data) => data?.stateList?.stateList?.data?.data?.rows
  );
  useEffect(() => {
    dispatch(getState());
    if (router.query.Id) {
      dispatch(getCityById(router.query.Id))
    }
  }, [router.query.Id]);

  const validate = (values) => {
    let errors = {};
    let itemArray = []
    if (!values.stateId) {
      errors['stateId'] = "*"
    }
    values?.city?.map((item, index) => {
      let error = {}
      if (!item.name) {
        error['name'] = "*"
      }
      itemArray.push(error)
      errors['city'] = itemArray
    })
    return errors;
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        mutators={
          ...arrayMutators
        }
        initialValues={useMemo(() => initialData(), [city])}
        validate={validate}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            {console.log(values)}
            <Row className="padding_top mt-3">
              <Col lg={6} md={12}>
                <Field name="stateId">
                  {({ input, meta }) => (
                    <>
                      <div className="d-flex">
                        <label className="signup_form_label">State Name</label>
                        {meta.error && meta.touched && (
                          <span className="text-danger required_msg">
                            {meta.error}
                          </span>
                        )}
                      </div>
                      <select
                        {...input}
                        className="form-control select-style signup_form_input margin_bottom"
                        disabled={router.query.Id ? true : false}
                      >
                        <option value="">Select State</option>
                        {stateList &&
                          stateList?.map((item) => (
                            <option key={item.id} value={Number(item.id)}>{item.state} </option>
                          ))}
                      </select>
                    </>
                  )}

                </Field>
              </Col>
              <Col lg={6} md={12} className="">

                <FieldArray name='city'>
                  {({ fields }) => (
                    <>
                      {fields.map((name, index) => (
                        <div className="d-flex">
                          <Field name={`${name}.name`}>
                            {({ input, meta }) => (
                              <div className="w-100">
                                <div className="d-flex">
                                  {index === 0 && <label className="signup_form_label">City Name</label>}
                                  {meta.error && meta.touched && (
                                    <span className="text-danger required_msg">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                                <input
                                  {...input}
                                  className="form-control select-style signup_form_input margin_bottom"
                                  placeholder="Enter City" />
                              </div>
                            )}
                          </Field>
                          <div className={index === 0 ? 'd-flex m_top_30' : 'd-flex'}>
                            {!router.query.Id && (
                              <div
                                type='button'
                                className='add_remove_btn'
                                onClick={() =>
                                  fields.push({ name: '' })
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
                  name="name"
                  component="input"
                  className="form-control select-style signup_form_input margin_bottom"
                  placeholder="Enter City"
                /> */}
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-4">
                <button className="admin_signup_btn m-2" type="submit">
                  {!router.query.Id ?
                    'Submit'
                    :
                    'update'
                  }
                </button>
              </Col>
            </Row>
          </form >
        )
        }
      />
    </>
  );
}

export default AddCityPage;
