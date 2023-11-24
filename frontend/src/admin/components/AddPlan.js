import React, { useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { CreatePlan, getPlans, updatePlans } from "../../redux/actions/LoginAction";
import { toast } from "react-toastify";
import Loader from "../../Page/Components/Loader";

function AddPlan(props) {
  const [previewImage, setPreviewImage] = useState(null);
  const [statusError, setStatusError] = useState();
  // const [selected, setSelected] = useState(props?.update?.status);
  const [changedFields, setChangedFields] = useState({});
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const handleFileChange = (event, input, meta, form) => {
    const file = event.target.files[0];

    if (file) {
      // Display a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      formAppend(file, form, input, "image", event);
    }
  };

  const formAppend = (data, form, input, lable, event) => {
    const formData = new FormData();

    // Pass the file to the form field
    input.onChange(data);

    // Append the file to FormData

    formData.append(lable, data);

    // Update the form state with the FormData
    form.change("formData", formData);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.image) {
      errors.image = "Image is required";
    }

    if (!values.title) {
      errors.title = "Title is required";
    }

    if (!values.tag_line) {
      errors.tag_line = "Tag Line is required";
    }

    if (!values.desc) {
      errors.desc = "Description is required";
    }

    if (!values.sell_price) {
      errors.sell_price = "Sell Price is required";
    } else if (isNaN(values.sell_price) || values.sell_price <= 0) {
      errors.sell_price = "Sell Price must be a positive number";
    }

    if (!values.actual_price) {
      errors.actual_price = "Actual Price is required";
    } else if (isNaN(values.actual_price) || values.actual_price <= 0) {
      errors.actual_price = "Actual Price must be a positive number";
    }

    if (!values.status) {
      errors.status = "Status is required";
    }

    return errors;
  };
  // const IsUpdating = useSelector((state)=> state?.updatePlans?.isLoading)
  // const isLoading = useSelector((state)=> state?.getPlans?.isLoading)
  const handleSubmit = (values) => {
    if(!props?.update){



      dispatch(CreatePlan(values)).then((res) => {
        toast(res?.payload?.status);
        props?.handelChangeKey();
        dispatch(getPlans());
      });
    }else{
    
      const fieldsToSubmit = Object.keys(changedFields).reduce((acc, fieldName) => {
        acc[fieldName] = values[fieldName];
        return acc;
      }, {});

      const updatedData = {
        id:props?.update?.id,
        update:fieldsToSubmit
      }

      dispatch(updatePlans(updatedData)).then((res)=>{
        toast(res?.payload?.message);
        props?.handelChangeKey();
        dispatch(getPlans())
      })
    }
  };


 const initialValues = {
    title: props?.updating ? props?.update?.title :"", 
    desc: props?.updating ? props?.update?.desc :"",
    image: props?.updating ? props?.update?.image :" ",
    sell_price:  props?.updating ? props?.update?.sell_price :"",
    actual_price: props?.updating? props?.update?.actual_price :"",
    status:  props?.updating ? props?.update?.status :"",
    tag_line:  props?.updating ? props?.update?.tag_line :""
  };

const handleFormChange = ({ values }) => {
  // Update the changedFields state with the fields that have changed
  setChangedFields((prevChangedFields) => {
    const newChangedFields = {};
    Object.keys(values).forEach((fieldName) => {
      if (values[fieldName] !== initialValues[fieldName]) {
        newChangedFields[fieldName] = true;
      }
    });
    return { ...prevChangedFields, ...newChangedFields };
  });
};
 


  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, form, values, meta, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          {/* {IsUpdating || isLoading &&<Loader/>} */}
          <div className="container">
            <div className="row justify-content-start align-items-start g-3">
              <div className="col-lg-6">
            
                <label htmlFor="file" className="img-div position-relative mb-3">
                  <span className="uploard-icon">
                    <BiPlus />
                  </span>
                  <Field name="image" type="file">
                    {({ input, meta }) => (
                      <div>
                        <input
                          id="file"
                          className="visibilty-new-hidden"
                          type="file"
                          accept="image/*"
                          
                          onChange={(event) =>
                            handleFileChange(event, input, meta, form)
                          }
                        />
                        {meta.touched && meta.error && (
                          <span className="error-validate text-danger">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  {previewImage && (
                    <div>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-100 h-100"
                        style={{
                          Width: "100%",
                          Height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                  )}

                   {!previewImage && props?.updating  && (
                    <div>
                      <img
                        src={`https://api.optimizsync.com/social/public/images/plan/${props?.update?.image}`}
                        alt="Preview"
                        className="w-100 h-100"
                        style={{
                          Width: "100%",
                          Height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                  )}
                </label>
                <label className="mb-3 w-100">
                <span className="fs-4 mb-2 requird">Plan Title</span>
                  <Field name="title" component="input">
                    {({ input, meta }) => (
                     <>
                        <input
                          {...input}
                          type="text"
                          placeholder="Enter Plan Title..."
                          className={`form-control w-100 ${
                            meta.touched && meta.error ? "red-error" : ""
                          }`}
                        />
                        {meta.touched && meta.error && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                        </>
                    )}
                  </Field>
                </label>
                <label className="mb-3 w-100">
                  <span className="fs-4 mb-2 requird">Details</span>
                  <Field className="form-control min-hieght-41" name="desc">
                    {({ input, meta }) => (
                      <div>
                        <textarea
                          {...input}
                          type="text"
                          placeholder="Plan Details"
                          className={`form-control w-100 ${
                            meta.touched && meta.error ? "red-error" : ""
                          }`}
                        ></textarea>
                        {meta.touched && meta.error && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </label>
              </div>
              <div className="col-lg-6">
              
                <label className="mb-3 w-100">
                <span className="fs-4 mb-2 requird">Tag Line</span>
                  <Field name="tag_line">
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="text"
                          placeholder="Enter Tag Line..."
                          className={`form-control w-100 ${
                            meta.touched && meta.error ? "red-error" : ""
                          }`}
                        />
                        {meta.touched && meta.error && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </label>
                <label className="mb-3 w-100">
                <span className="fs-4 mb-2 requird">Sell Price</span>
                  <Field className="form-control " name="sell_price">
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="text"
                          placeholder="Enter Sell Price"
                          className={`form-control w-100 ${
                            meta.touched && meta.error ? "red-error" : ""
                          }`}
                        />
                        {meta.touched && meta.error && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </label>
                <label className="mb-3 w-100">
                <span className="fs-4 mb-2 requird">Actual Price</span>
                  <Field className="form-control " name="actual_price">
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="text"
                          placeholder="Enter Actual Price"
                          className={`form-control w-100 ${
                            meta.touched && meta.error ? "red-error" : ""
                          }`}
                        />
                        {meta.touched && meta.error && (
                          <span className="text-danger">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </label>
                <div className="mb-3" >
                    <div className="d-flex gap-3  radio-type">
                    <label>
                      <Field name="status" >
                        {({ input, meta }) => (
                          <div>
                            <input {...input} type="radio" value="active" />
                            {meta.touched && meta.error &&  setStatusError(meta.error)}
                          </div>
                        )}
                      </Field>
                      Active
                    </label>
                    <label>
                      <Field
                        name="status"
                        component="input"
                        type="radio"
                        value="inactive"
                      />
                      Inactive
                    </label>
                   </div>
                  {!values?.status && <span className="text-danger">{statusError}</span> }
                </div>
              </div>


              

       
              {props?.updating && <FormSpy onChange={handleFormChange} />}
              <button
                disabled={submitting || pristine}
                type="submit"
                className="btn text-white py-2 mt-0 make_animation w-25"
                style={{ background: "var(--theme-mein)", fontSize: "17px" }}
              >
                Save Plan
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
}

export default AddPlan;
