import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { useRouter } from "next/router";
import { AddMainCategory, getMainCategoryListById, updateMainCategoryList } from "../../../../redux/actions/corporate/addmaincategory";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Addmaincategory() {
  const router = useRouter();
  const { Id } = router.query
  const dispatch = useDispatch();

  const maincategoryListbyId = useSelector(
    (state) => state?.corporateCategory?.maincategoryId?.rows
  );

  const handleSubmit = (values) => {
  
    if (!Id) {
      dispatch(AddMainCategory(values))
        .then((res) => {
          if (res?.payload?.data?.success) {
            const status = res?.payload?.data?.data?.corp[0]?.status;
            if (status == "duplicate") {
              toast.error(`Main Category is ${status}`, { autoClose: 1000 });
            } else {
              toast.success("Main Category added successfuly", { autoClose: 1000 });
              router.push("/admin/corporate");
            }
          }
        })
    } else {
      let updateMainCategory = {
        mainCategory: [
          {
            id: Id,
            mainCategory: values.mainCategory[0]?.mainCategory
          }
        ]
      }
      dispatch(updateMainCategoryList(updateMainCategory)).then((res) => {
       
        if(res?.payload?.data?.success){
          toast.success('Updated', {autoClose:1000})
          router.push('/admin/corporate')
        }else{
          let statuss = res?.payload?.data?.message
          toast.error(statuss, {autoClose: 1000})
        }
      })
    }
  }

  const setInitial = () => {
    let initialValues = {};
    if (Id) {
      initialValues.mainCategory = [{ mainCategory: maincategoryListbyId && maincategoryListbyId[0]?.mainCategory }];
    } else {
      initialValues.mainCategory = [{ mainCategory: "" }];
    }
    return initialValues;
  };

  const validate = (values) => {
    let errors = {}
    let itemArray = []
    values?.mainCategory?.map((item) => {
      let error = {}
      if (!item?.mainCategory) {
        error['mainCategory'] = "*"
      }
      itemArray.push(error)
    })
    errors['mainCategory'] = itemArray
    return errors
  }

  useEffect(() => {
    dispatch(getMainCategoryListById({ id: Number(Id) }))
  }, [Id])


  return (
    <div>
      <Container className="p-0">
        <Row className="my-3 padding_top">
          <Col>
            <h3 className="master_heading">Main Category</h3>
            <hr></hr>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form
              onSubmit={handleSubmit}
              mutators={{
                // potentially other mutators could be merged here
                ...arrayMutators,
              }}
              validate={validate}
              initialValues={setInitial()}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Row>
                    <FieldArray name="mainCategory">
                      {({ fields }) => (
                        <div>
                          <>
                            {fields.map((name, index) => (
                              <Row>
                                <Col lg={12} md={12}>
                                  <div className="add_main_stream_btn_input margin_bottom">
                                    <Field name={`${name}.mainCategory`}>
                                      {({ input, meta }) => (
                                        <div className="w-100">
                                          <input
                                            {...input}
                                            type="text"
                                            className="form-control signup_form_input"
                                            placeholder="Enter Main Category"
                                          />
                                          {meta.error && meta.touched && (
                                            <span className="text-danger required_msg">{meta.error}</span>
                                          )}
                                        </div>
                                      )}
                                    </Field>

                                    <div className="d-flex mt-2 ">
                                      {!Id && (
                                        <div
                                          type="button"
                                          className="add_remove_btn"
                                          onClick={() =>
                                            fields.push({ mainCategory: "" })
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
                        {router.query.Id ? "Update" : "Add"}
                      </button>
                    </Col>
                  </Row>
                </form>
              )}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Addmaincategory;
