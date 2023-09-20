import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { useDispatch, useSelector } from "react-redux";
import arrayMutators from "final-form-arrays";
import {
  createNewIndustry,
  editIndustry,
  getIndustryById,
  getlistSector,
} from "../../../redux/actions/organisation/addsector";
import { toast } from "react-toastify";
import LoaderPage from "../../common-components/loader";

const NewIndusty = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { Id } = router.query;

  const getIndustryList = useSelector(
    (state) => state?.sectorData?.industryBylist
  );
  const isLoading = useSelector((state) => state?.sectorData?.isLoading);

  // for getting all sector list
  useEffect(() => {
    dispatch(getlistSector());
  }, []);
  const getSectorList = useSelector((state) => state?.sectorData?.sectorlist);

  const handleSubmit = (values) => {
    let UpdateIndustry = {};

    if (!Id) {
      let obj = values?.industryData?.map((item) => ({
        ...item,
        sectorId: Number(values?.sectorId),
      }));

      // creating/adding new industry action
      dispatch(
        createNewIndustry({
          industryData: obj,
        })
      ).then((res) => {
        if (res?.payload?.data?.success) {
          const status = res?.payload?.data?.data?.org[0]?.status;
          if (res?.payload?.data?.data?.org[0]?.status == "duplicate") {
            toast.error(`Industry is ${status}`, { autoClose: 1000 });
          }
          if (res?.payload?.data?.data?.org[0]?.active) {
            router.push("/admin/organisation");
            toast.success("Industry added successfuly", { autoClose: 1000 });
          }
        }
      });
    } else {
      UpdateIndustry = {
        industryData: [
          {
            id: Id,
            name: values?.industryData[0]?.name,
            sectorId: values?.industryData[0]?.id,
          },
        ],
      };

      dispatch(editIndustry(UpdateIndustry)).then((res) => {
        if (res?.payload?.data?.success) {
          router.push("/admin/organisation");
          toast.success("Updated", { autoClose: 1000 });
        } else {
          toast.error("error", { autoClose: 1000 });
        }
      });
    }
  };

  const handleInit = () => {
    let initialValue = {};
    if (Id) {
      initialValue = {
        sectorId: getIndustryList[0]?.Sector?.id,
        industryData: [
          {
            name: getIndustryList[0]?.name,
          },
        ],
      };
    } else {
      initialValue = {
        industryData: [{ sectorId: "", name: "" }],
      };
    }

    return initialValue;
  };

  useEffect(() => {
    if (Id) {
      dispatch(getIndustryById({ id: Number(Id) }));
    }
  }, [Id]);

  const validate = (values) => {
    let errors = {};
    let itemArray = [];
    if (!values?.sectorId) {
      errors["sectorId"] = "*";
    }
    values?.industryData?.map((item) => {
      let error = {};
      if (!item?.name) {
        error["name"] = "*";
      }
      itemArray.push(error);
    });
    errors["industryData"] = itemArray;
    return errors;
  };

  return (
    <>
      <Row className="my-3 padding_top">
        <Col>
          <h3 className="fw-bold">New Industry</h3>
          <hr></hr>
        </Col>
      </Row>
      {isLoading && <LoaderPage />}

      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            mutators={{
              ...arrayMutators,
            }}
            validate={validate}
            initialValues={useMemo(() => handleInit(), [getIndustryList])}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={12}>
                    <Field name="sectorId">
                      {({ input, meta }) => (
                        <>
                          <div className="d-flex">
                            <label className="signup_form_label">
                              New Sector
                            </label>

                            {meta.touched && meta.error && (
                              <span className="text-danger required_msg">
                                {meta.error}
                              </span>
                            )}
                          </div>
                          <select
                            {...input}
                            className="form-control signup_form_input"
                            disabled={router.query.Id ? true : false}
                          >
                            {router.query.Id ? (
                              <option>
                                {getIndustryList[0]?.Sector?.name}
                              </option>
                            ) : (
                              <option>Select sector</option>
                            )}
                            {getSectorList &&
                              getSectorList?.rows?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            *
                          </select>
                        </>
                      )}
                    </Field>
                    <div className="text-end">
                      <img
                        className="select_down_icon"
                        src="/images/down.png"
                      />
                    </div>
                  </Col>
                </Row>

                <div>
                  <FieldArray name="industryData">
                    {({ fields }) => (
                      <>
                        {fields.map((name, index) => (
                          <Row>
                            <Col lg={12} md={12}>
                              <div className="add_main_stream_btn_input margin_bottom">
                                <Field name={`${name}.name`}>
                                  {({ input, meta }) => (
                                    <div className="w-100">
                                      <div className="d-flex">
                                        {index === 0 && (
                                          <>
                                            <label className="signup_form_label">
                                              New Industry
                                            </label>


                                            {meta.touched && meta.error && (
                                              <span className="text-danger required_msg">
                                                {meta.error}
                                              </span>
                                            )}
                                          </>
                                        )}
                                      </div>
                                      <input
                                        {...input}
                                        type="text"
                                        className="form-control signup_form_input"
                                        placeholder="Enter industry"
                                      />
                                    </div>
                                  )}
                                </Field>
                                <div
                                  className={
                                    index === 0
                                      ? " d-flex m_top_30"
                                      : " d-flex "
                                  }
                                >
                                  {!router.query.Id && (
                                    <div
                                      type="button"
                                      className="add_remove_btn"
                                      onClick={() => fields.push({ name: "" })}
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
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>
                <Row>
                  <Col className="text-center">
                    <button className="admin_signup_btn  mt-3" type="submit">
                      {router.query.Id ? "Update" : "Submit"}
                    </button>
                  </Col>
                </Row>
              </form>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default NewIndusty;
