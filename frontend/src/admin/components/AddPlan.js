import React, { useState } from 'react'
import { Field, Form } from "react-final-form";
import { BiPlus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { CreatePlan, getPlans } from '../../redux/actions/LoginAction';
import { toast } from 'react-toastify';
import Select from 'react-select';
import Loader from '../../Page/Components/Loader';
// import validationSchema from './validationSchema';
import { object, string } from 'yup';

function AddPlan(props) {
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState(null);
  const dispatch =useDispatch()
  const handleFileChange = (event, input, meta, form) => {
    const file = event.target.files[0];

    if (file) {
      // Display a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      formAppend(file,form, input,'image',event)
    }
  };


  const formAppend = (data,form,input,lable,event) =>{
   const formData = new FormData();

    // Pass the file to the form field
    input.onChange(data);

    // Append the file to FormData

    formData.append(lable, data);

    // Update the form state with the FormData
    form.change('formData', formData);
  }




  const validate = (values) => {
    const errors = {};
  
    if (!values.image) {
      errors.image = 'Image is required';
    }
  
    if (!values.title) {
      errors.title = 'Title is required';
    }
  
    if (!values.tag_line) {
      errors.tag_line = 'Tag Line is required';
    }
  
    if (!values.desc) {
      errors.desc = 'Description is required';
    }
  
    if (!values.sell_price) {
      errors.sell_price = 'Sell Price is required';
    } else if (isNaN(values.sell_price) || values.sell_price <= 0) {
      errors.sell_price = 'Sell Price must be a positive number';
    }
  
    if (!values.actual_price) {
      errors.actual_price = 'Actual Price is required';
    } else if (isNaN(values.actual_price) || values.actual_price <= 0) {
      errors.actual_price = 'Actual Price must be a positive number';
    }
  
    if (!values.status) {
      errors.status = 'Status is required';
    }
  
    return errors;
  };
  
  const handleSubmit = (values) => {
    dispatch(CreatePlan(values)).then((res)=>{
      toast(res?.payload?.status)
      props?.handelChangeKey()
      dispatch(getPlans())
    })
    
  };


  return (
    <Form
    onSubmit={handleSubmit}
    validate={validate}
    render={({ handleSubmit ,form,values,meta,submitting,pristine }) => (
      <form onSubmit={handleSubmit}>
      <div className='container'>
        <div className="row justify-content-start align-items-start g-3">
          <div className="col">
            <label htmlFor='file' className='img-div position-relative'>
              <span className='uploard-icon'><BiPlus/></span>
              <Field name="image" type="file"  >
            {({ input, meta }) => (
              <div>
                <input
                  id="file"
                  className='visibilty-new-hidden'
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileChange(event, input, meta, form)}
                />
                {meta.touched && meta.error && <span className='error-validate'>{meta.error}</span>}
              </div>
            )}
          </Field>

          {previewImage && (
            <div>
              <img src={previewImage} alt="Preview" style={{ Width: '100%', Height: '100%', objectFit:'cover',objectPosition:'center' }} />
            </div>
          )}
            </label>
          </div>
          <div className="col">
            <label className='mb-3 w-100'>
            <Field name="title" >
            {({ input, meta }) => (
              <div>
                <input {...input} type="text" placeholder="Enter Plan Title..."   className="form-control w-100"/>
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
            </Field>
            {/* {meta.touched && meta.error && <span>{meta.error}</span>} */}
            </label>
            <label className='mb-3 w-100'>
              <Field
              className="form-control w-100"
                name="tag_line"
                placeholder="Enter Tag Line..."
                component="input"
                type="text"
              />
                {/* {meta.touched && meta.error && <span>{meta.error}</span>} */}
            </label>
            <label className='mb-3 w-100'>
              <Field
              className="form-control "
                name="sell_price"
                placeholder="Enter Sell Price"
                component="input"
                type="text"
              />
               {/* {meta.touched && meta.error && <div>{meta.error.desc}</div>} */}
            </label>
         
          </div>
          <div className="col">
        <div className='mb-3'>
        <div className='d-flex gap-3  radio-type'>
            <label>
              <Field
                name="status"
                component="input"
                type="radio"
                value="active"
              />
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
        {/* {meta.touched && meta.error && <div>{meta.error.status}</div>} */}
        </div>
        
          
          <label className='mb-3 w-100'>
              <Field
              className="form-control "
                name="actual_price"
                placeholder="Enter Actual Price"
                component="input"
                type="text"
              />
              {/* {meta.touched && meta.error && <div>{meta.error.actual_price}</div>} */}
            </label>
          

           <div>

           </div>
        
            </div>
            <div className='col-md-12'>
            <label className='mb-3 w-100'>
            <span className='fs-4 mb-2 requird'>Details</span>
              <Field
              className="form-control min-hieght-41"
                name="desc"
                placeholder="Plan Details"
                component="textarea"
                type="text"
              />
              {/* {meta.touched && meta.error && <div>{meta.error.sell_price}</div>} */}
            </label>
            
            </div>

          <button  disabled={submitting || pristine} type="submit" className="btn text-white py-3 mt-0 make_animation" style={{ background: "var(--theme-mein)",fontSize: "17px" }}>Save Plan</button>
        </div>
      </div>
      </form>
      )}
    />
  )
}

export default AddPlan
