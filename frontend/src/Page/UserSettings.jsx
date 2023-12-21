import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import Select from "react-select";
import { UserMebership, getPlans, users } from "../redux/actions/LoginAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserId } from "../utils/auth";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { FaUserCog } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { FaWallet } from "react-icons/fa";

function UserSettings() {
  const [getAllPlan,setGetAllPlan] = useState()
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getPlans()).then((res)=>{
      setGetAllPlan(res?.payload?.plan)
    })
  },[])

  const onSubmit = async (values) => {
    console.log(values);

  };

  const colourOptions = [
    { value: "free", label: "Free" },
    { value: "stater", label: "Stater" },
    { value: "business", label: "Business" },
  ];
  const handelChange = (e, id) => {
    const meberUpdate = {
      id: e.value,
      id,
      update: {
        membership: e?.value,
      },
    };
    dispatch(UserMebership(meberUpdate)).then((res) => {
      toast(res?.payload?.message);
      dispatch(users());
      // SetActiveUpdate(0)
    });
  };
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3 mb-4 d-flex ">
            <div className="User-panel w-100 h-100 shadow-sm px-3 rounded">
              <div className="userIMages d-flex justify-content-center w-100 my-4">
                <label htmlFor="" className="position-relative">
                  <img src="#" alt="" />
                  <FaUserCircle size={100} className="m-auto" />
                  <label className="edit-btn" htmlFor="imageUpload">
                    {" "}
                    <MdModeEdit size={18} />
                  </label>
                  <h3 className="fs-4 text-center mt-2">USERNAME</h3>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="visibilti-none"
                />
              </div>
              <Nav variant="pills" className="flex-md-column flex-row justify-content-center mt-5 mb-5">
                <Nav.Item>
                  <Nav.Link eventKey="first"><FaUserCog size={18} /> User Settings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second"><SlBadge size={18} /> Plans</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="three"><FaWallet size={18}  /> Billings</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          <div className="col-md-9  d-flex">
            <div className="genrete-password rounded shadow-sm w-100 p-3">
              <Tab.Content>
                <Tab.Pane eventKey="first">
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
                        <h3 className="mb-3">Basic Details</h3>
                        <div className="mb-3">
                          <label htmlFor="" className="mb-1">Your Name</label>
                          <Field
                            className="form-control"
                            name="name"
                            component="input"
                            type="text"
                            placeholder="Full Name"
                            value={(values.name = getUserId()?.user?.name)}
                          />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="" className="mb-1">Your Email</label>
                          <Field
                            className="form-control"
                            name="email"
                            component="input"
                            type="email"
                            placeholder="example@email.com"
                           
                          />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="" className="mb-1">Your Address</label>
                          <Field
                            className="form-control"
                            name="address"
                            component="input"
                            type="text"
                            placeholder="ex: 1234 NW Bobcat Lane"
                           
                          />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="" className="mb-1">Your phone Number</label>
                          <Field
                            className="form-control"
                            name="number"
                            component="input"
                            type="number"
                            placeholder="+919876543210"
                           
                          />
                        </div>
                        <button type="submit" className="btn hero-body" >Save</button>
                      </form>
                    )}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">  
                <div className="mb-3 row">
                  <div className="col-md-12">
                  <p className="mb-3 text-center fs-6">Membership</p>
                  </div>
                  {getAllPlan?.map((item)=>{
                    return(
                      item?.status === "active" && (
                        <div className="col-md-4">
                        <div className="user_plan d-flex flex-column align-items-center justify-content-between w-100 pb-4">
                          <h3 className="fs-6 mb-2 mt-3" style={{fontWeight:"600" }}>
                            {item?.title}
                          </h3>
                          {/* <p>{item?.desc}</p> */}
                          {/* <p>Actual Price : <br/><span className="text-decoration-line-through text-center d-block">INR {item?.actual_price}</span></p>
                          <p>Sell Price : <br/> <span >INR {item?.sell_price}</span></p> */}
                          {item?.title?.toLowerCase() === getUserId()?.user?.membership?.toLowerCase() ?
                          <div className="btn btn-dark mt-4  text-white" style={{ padding:"11px 43px",}}>
                          Current Plan
                        </div> : 
                         <div className="btn hero-body rounded-2 mt-4 text-white">
                         Get Started
                       </div>
                          }

                         
                        </div>
                        </div>
                      )
                    )
                  })}
                 
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                    </div>
                  </div>
                  </Tab.Pane>
                <Tab.Pane eventKey="three">three tab content</Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </div>
      </div>
    </Tab.Container>
  );
}

export default UserSettings;
