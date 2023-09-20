import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import arrayMutators from "final-form-arrays";
import {
  createprofessioncode,
  editProfessionCode,
  familycodeList,
  professionCodeById,
} from "../../../redux/actions/organisation/profession";
import { toast } from "react-toastify";

function AddProfessioncode() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const { Id } = router.query;

  const professionCodeDetails = useSelector(
    (state) => state?.sectorData?.professionCodeById
  );
  const familycodelist = useSelector(
    (state) => state?.sectorData?.familyCodelist
  );

  const handleSubmit = (values) => {
    if (Id) {
      let data = { profession: [] };
      data.profession = values?.profession?.map((item) => {
        return {
          ...item,
          familyId: Number(values?.family),
        };
      });
      dispatch(editProfessionCode(data)).then((res) => {
        if (res?.payload?.data?.success) {
          toast.success("Successful");
          router.push("/admin/organisation");
        } else {
          toast.error("Error");
        }
      });
    } else {
      let data = { profession: [] };
      data.profession = values?.profession?.map((item) => {
        return {
          ...item,
          familyId: Number(values?.family),
        };
      });
      dispatch(createprofessioncode(data)).then((res) => {
        if (res?.payload?.data?.success) {
          toast.success("Successful");
          router.push("/admin/organisation");
        } else {
          toast.error("Error");
        }
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const itemErray = [];
    if (!values.family) {
      errors["family"] = "*";
    }
    values?.profession?.map((ele) => {
      const error = {};
      if (!ele.professionName || ele.professionName === " ") {
        error["professionName"] = "*";
      }
      if (!ele.professionCode || ele.professionCode === " ") {
        error["professionCode"] = "*";
      }
      itemErray.push(error);
    });
    errors["profession"] = itemErray;
    console.log(errors, "oooooooooo");
    return errors;
  };

  const setInitial = (e) => {
    if (e && Object.keys(e).length > 0) {
      return e;
    }
    let initialValues = {};
    if (Id) {
      if (professionCodeDetails?.length > 0) {
        initialValues.family = professionCodeDetails[0]?.familyId;
        initialValues.profession = [
          {
            professionCode: professionCodeDetails[0]?.professionCode,
            professionName: professionCodeDetails[0]?.professionName,
            id: professionCodeDetails[0]?.id,
          },
        ];
      }
    } else {
      initialValues.family = "";
      initialValues.profession = [{ professionCode: "", professionName: "" }];
    }
    return initialValues;
  };

  useEffect(() => {
    dispatch(familycodeList());
    if (Id) {
      dispatch(professionCodeById(Number(Id)));
    }
  }, [Id]);
  return (
    <>
      <Container className="p-0">
        <Row className="my-3 padding_top">
          <Col>
            <h3 className="master_heading">Profession code</h3>
            <hr></hr>
          </Col>
        </Row>
        <Form
          onSubmit={handleSubmit}
          mutators={{
            // potentially other mutators could be merged here
            ...arrayMutators,
          }}
          validate={validate}
          initialValues={useMemo((e) => setInitial(e), [professionCodeDetails])}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg={12}>
                  <Field name={`family`}>
                    {({ input, meta }) => (
                      <div className="w-100">
                        <div className="d-flex">
                          <label className="signup_form_label">
                            Family Details
                          </label>
                          {meta.error && meta.touched && (
                            <span className="text-danger required_msg">
                              {meta.error}
                            </span>
                          )}
                        </div>
                        <select
                          {...input}
                          type="text"
                          className="form-control signup_form_input "
                        >
                          <option value="">Select Family</option>
                          {familycodelist?.rows?.length > 0 &&
                            familycodelist?.rows?.map((item, index) => {
                              return (
                                <option key={index} value={item?.id}>
                                  {item?.familyName}
                                </option>
                              );
                            })}
                        </select>
                        <div className="text-end">
                          <img
                            className="select_down_icon"
                            src="/images/down.png"
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </Col>
                {/* <Col lg={6} sm={12}>
                  <div className="w-100">
                                                <input
                                                    type="number"
                                                    className="form-control signup_form_input"
                                                    placeholder="family code"
                                                    value={() => {
                                                        familycodelist?.rows?.find((item) => { console.log(item?.id === values?.family?.familyId) })
                                                    }}
                                                />
                                            </div>
                </Col> */}
                <FieldArray name="profession">
                  {({ fields }) => (
                    <>
                      {fields.map((name, index) => (
                        <div className="margin_bottom">
                          <Row className="w-100">
                            <Col lg={6} sm={12}>
                              <Field name={`${name}.professionName`}>
                                {({ input, meta }) => (
                                  <div className="w-100">
                                    <div className="d-flex">
                                      {index === 0 && (
                                        <label className="signup_form_label">
                                          Profession Details
                                        </label>
                                      )}
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div>
                                    <input
                                      {...input}
                                      type="text"
                                      className="form-control signup_form_input"
                                      placeholder="Enter Profession name"
                                    />
                                  </div>
                                )}
                              </Field>
                            </Col>
                            <Col
                              lg={6}
                              sm={12}
                              className={
                                index === 0
                                  ? "d-flex col_padding_top"
                                  : "d-flex "
                              }
                            >
                              <Field name={`${name}.professionCode`}>
                                {({ input, meta }) => (
                                  <div className="w-100">
                                    {/* <div className="d-flex">
                                      {meta.error && meta.touched && (
                                        <span className="text-danger required_msg">
                                          {meta.error}
                                        </span>
                                      )}
                                    </div> */}
                                    <input
                                      {...input}
                                      type="number"
                                      className="form-control signup_form_input"
                                      placeholder="Enter Profession Code"
                                    />
                                  </div>
                                )}
                              </Field>
                              {!Id && (
                                <div className="d-flex">
                                  {!Id && (
                                    <div
                                      type="button"
                                      className="add_remove_btn"
                                      onClick={() =>
                                        fields.push({
                                          professionCode: "",
                                          professionName: "",
                                        })
                                      }
                                    >
                                      <img
                                        className="add_remove_icon"
                                        src="/images/plus.png"
                                      />
                                    </div>
                                  )}
                                  {fields.length > 1 ? (
                                    <div
                                      className="add_remove_btn"
                                      type="button"
                                      onClick={() => fields.remove(index)}
                                    >
                                      <img
                                        className="add_remove_icon"
                                        src="/images/minus.png"
                                      />
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              )}
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </Row>
              <Row>
                <Col className="text-center">
                  <button
                    className="admin_signup_btn Profession_btn  mt-3"
                    type="submit"
                  >
                    {Id ? "Update" : "Add Profession Code"}
                  </button>
                </Col>
              </Row>
            </form>
          )}
        />
      </Container>
    </>
  );
}

export default AddProfessioncode;
