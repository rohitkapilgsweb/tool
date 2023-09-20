import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import arrayMutators from "final-form-arrays";
import {
  createNewSector,
  editSector,
  getSectorById,
} from "../../../redux/actions/organisation/addsector";
import { toast } from "react-toastify";

const AddnewSector = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { Id } = router.query;

  const InitialValSector = useSelector(
    (state) => state?.sectorData?.sectorByIdlist[0]
  );

  const handleSubmit = (values) => {
    let UpdataSector = {};

    if (!Id) {
      dispatch(createNewSector(values)).then((res) => {
        console.log(res,res?.payload?.data?.success)
        if (res?.payload?.data?.success) {
          let status = res?.payload?.data?.data?.corp[0]?.status;
          if (status) {
            if (status == "duplicate") { 
              toast.error(`Sector is ${status}`, { autoClose: 1000 });
            }
          } if (res?.payload?.data?.data?.corp[0]?.active) { 
            toast.success("Sector added successfuly", { autoClose: 1000 });
            router.push("/admin/organisation");
          }
        }
      });
    } else {
      UpdataSector = {
        sectorData: [
          {
            id: Id,
            name: values.sectorData[0].name,
          },
        ],
      };
      dispatch(editSector(UpdataSector)).then((res) => {
        if (res?.payload?.data?.success) {
          router.push("/admin/organisation");
          toast.success("Updated", { autoClose: 1000 });
        } else {
          toast.error(res?.payload?.data?.message);
        }
      });
    }
  };

  const setInitial = () => {
    let initialValues = {};
    if (Id) {
      initialValues.sectorData = [{ name: InitialValSector?.name }];
    } else {
      initialValues.sectorData = [{ name: "" }];
    }
    return initialValues;
  };

  const validate = (values) => {
    let errors = {}
    let itemArray = []
    values?.sectorData?.map((item) => {
      let error = {}
      if (!item?.name) {
        error["name"]="*"
      }
      itemArray.push(error)
    })
    errors["sectorData"] = itemArray
    return errors;
  }

  useEffect(() => {
    if (Id) {
      dispatch(getSectorById({ id: Number(Id) }));
    }
  }, [Id]);

  return (
    <Container className="p-0">
      <Row className="my-3 padding_top">
        <Col>
          <h3 className="master_heading">Add New Sector</h3>
          <hr></hr>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
              ...arrayMutators,
            }}
            keepDirtyOnReinitialize
            validate={validate}
            initialValues={useMemo(() => setInitial(),[InitialValSector])}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <FieldArray name="sectorData">
                    {({ fields }) => (
                      <div>
                        <>
                          {fields.map((name, index) => (
                            <Row>
                              <Col lg={12} md={12}>
                                <div className="add_main_stream_btn_input margin_bottom">
                                  <Field name={`${name}.name`}>
                                    {({ input, meta }) => (
                                      <div className="w-100">
                                        <input
                                          {...input}
                                          type="text"
                                          // className="form-control signup_form_input"
                                          className={
                                            meta.touched
                                              ? meta.error
                                                ? "red_border form-control select-style signup_form_input "
                                                : "form-control select-style signup_form_input "
                                              : "form-control select-style signup_form_input "
                                          }
                                          placeholder="Enter Sector Name"
                                        />
                                        {/* {meta.error && meta.touched && (
                                          <span className='text-danger required_msg'>
                                            {meta.error}
                                          </span>
                                        )} */}
                                      </div>
                                    )}
                                  </Field>

                                  <div className="d-flex">
                                    {!router.query.Id && (
                                      <div
                                        type="button"
                                        className="add_remove_btn"
                                        onClick={() =>
                                          fields.push({ name: "" })
                                        }
                                      >
                                        <img
                                          className="add_remove_icon"
                                          src="/images/plus.png"
                                        />
                                      </div>
                                    )}
                                    {fields.length > 1 && (
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
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          ))}
                        </>
                      </div>
                    )}
                  </FieldArray>
                </Row>
                <Row>
                  <Col className="text-center">
                    <button className="admin_signup_btn  mt-3" type="submit">
                      {router.query.Id ? "Update" : "Add Sector"}
                    </button>
                  </Col>
                </Row>
              </form>
            )}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AddnewSector;
