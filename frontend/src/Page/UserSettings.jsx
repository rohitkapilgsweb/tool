import React from "react";
import { Field, Form } from "react-final-form";
import Select from 'react-select';
import { UserMebership, users } from "../redux/actions/LoginAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserId } from "../utils/auth";
function UserSettings() {


  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    console.log(values)
  }

    const colourOptions = [
    { value: 'free', label: 'Free'},
    { value: 'stater', label: 'Stater'},
    { value: 'business', label: 'Business'}
  ]
  const handelChange=(e,id)=>{
    const meberUpdate = {
      id:e.value,id,
      update:{
        membership:e?.value
      }
    }
    dispatch(UserMebership(meberUpdate)).then((res)=>{
      toast(res?.payload?.message)
      dispatch(users())
      // SetActiveUpdate(0)
    })
  }
  return (
    <Form
    onSubmit={onSubmit}
    render={({
      handleSubmit,
      form,
      submitting,
      pristine,
      values,
    }) => (
      
      <form onSubmit={handleSubmit}>
        
    <div className="container">
      <div className="row">
        
        <div className="col-md-4">
          <div className="genrete-password">
            <img src="#" alt="" />
            <div className="mb-3">
                <Field
                className="form-control"
                name="name"
                component="input"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-3">
                <Field
                className="form-control"
                name="email"
                component="input"
                type="email"
                placeholder="Your Email"
                value={values.email = getUserId()?.user?.name }
              />
              
            </div>
            <div className="mb-3">
            {/* <Select
             onChange={(e)=>handelChange(e,getUserId()?.user?.id)}
             options={colourOptions}
            /> */}
            <p className="mb-1">Your Membership</p>
              <div className="user_plan d-flex align-items-center justify-content-between w-100">
                <h3 className="fs-4">{getUserId()?.user?.membership}</h3>
                <div className="btn btn-dark text-white"> Upgrade </div>
              </div>

            </div>

          </div>
        </div>
        <div className="col-md-6">
          <div className="All-genrete-password">
            {/* <img src="#" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
    </form>
  )}
    />
  );
}

export default UserSettings;
