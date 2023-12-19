import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AiFillMessage, AiOutlineMail } from "react-icons/ai";
import { MdOutlineWebhook } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { CgTemplate } from "react-icons/cg";
import SingleMessege from "./Whatsapp/SingleMessege";
import Bulk from "./Whatsapp/Bulk";
import { getUserId } from "../../utils/auth";
import { Field, Form } from "react-final-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { WhatsappRequest } from "../../redux/actions/LoginAction";
import Loader from "../Components/Loader";
import BannerImg from "../../assets/img/webbanner.jpg";
import { toast } from "react-toastify";
// import MsgTempales from './Whatsapp/MsgTempales';
function Whatsapp() {
  const role = getUserId() ? getUserId()?.user?.role : null;
  const [isSearchable, setIsSearchable] = useState(true);
  const [pageDetails, setPageDetails] = useState();

  // useEffect(()=>{
  //   dispatch(WhatsappRequest({userObjectId: getUserId()?.id,}))
  // },[getUserId()?.id])

  const selectPageChange = (values) => {
    setPageDetails(values);
  };

  let MapPages = [
    {
      value: "1",
      label: "Small",
      key: "Small",
    },
    {
      value: "1",
      label: "Medium",
      key: "Medium",
    },
    {
      value: "1",
      label: "Large",
      key: "Large",
    },
  ];
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const RequestFields = {
      name: values?.name,
      bus_type: pageDetails?.key,
      phone: values?.phone,
    };
    const datadataNumber = pageDetails?.key + 1;

    dispatch(WhatsappRequest(RequestFields)).then((res)=>{
      if(res?.payload?.status){
        toast(res.payload.status)
      }
    });
  };

  const isLoading = useSelector((state) => state?.whatsappReqStore?.isLoading);
  const userReqStatus = useSelector(
    (state) => state?.whatsappReqStore?.data?.status
  );

  return (
    <>
      <img src={BannerImg} className="img-fluid rounded-top" alt="" />
      <div color="container pt-4">
        {isLoading && <Loader />}
        <div className="row justify-content-center align-items-center m-0 ">
          <div className="col  px-5 mt-3">
            <div className="menu-box Post-tabs ">
              {role === "user" && (
                <Tabs
                  defaultActiveKey="SingleMessege"
                  id="uncontrolled-tab-example"
                  className="mt-3 gap-3  mb-3"
                >
                  <Tab
                    eventKey="Configration"
                    title={
                      <>
                        <RiSettings3Fill size={20} />{" "}
                        <span className="white-space"> Configration</span>
                      </>
                    }
                  >
                    Cooming Soon
                  </Tab>
                  <Tab
                    eventKey="SingleMessege"
                    title={
                      <>
                        <AiOutlineMail size={20} />{" "}
                        <span className="white-space"> Single Messege</span>
                      </>
                    }
                  >
                    <SingleMessege />
                  </Tab>
                  <Tab
                    eventKey="BulkMessege"
                    title={
                      <>
                        <AiFillMessage size={20} />{" "}
                        <span className="white-space"> Bulk Messege</span>
                      </>
                    }
                  >
                    <Bulk />
                  </Tab>

                  <Tab
                    eventKey="Templates"
                    title={
                      <>
                        <CgTemplate size={20} />{" "}
                        <span className="white-space"> Messege Templates</span>
                      </>
                    }
                  >
                    {/* <MsgTempales/>  */}
                    CoomingSoon
                  </Tab>
                  <Tab
                    eventKey="Webhook"
                    title={
                      <>
                        <MdOutlineWebhook size={20} />{" "}
                        <span className="white-space"> Webhook</span>
                      </>
                    }
                  >
                    Cooming Soon
                  </Tab>
                </Tabs>
              )}
              {role === "tempuser" && (
                <>
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
                        <div className="container-fluid pb-5">
                          <div className="row justify-content-center align-items-center g-md-5 mt-4">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label>Full Name</label>
                                <Field
                                  className="form-control"
                                  name="name"
                                  component="input"
                                  type="text"
                                  placeholder="Enter Full Name"
                                />
                              </div>
                              <div className="mb-3">
                                <label>Mobile Number</label>
                                <Field
                                  className="form-control"
                                  name="phone"
                                  component="input"
                                  type="number"
                                  placeholder="Enter Mobile Number"
                                />
                              </div>
                              <div className="mb-3">
                                <label>Select Business type</label>
                                <Select
                                  className="basic-single p-0 form-control"
                                  classNamePrefix="select"
                                  defaultValue={"Select Page"}
                                  isSearchable={isSearchable}
                                  name="color"
                                  options={MapPages}
                                  onChange={selectPageChange}
                                />
                              </div>
                              <button
                                type="submit"
                                className="btn btn-dark text-white"
                              >
                                Send Request
                              </button>
                            </div>
                            <div className="col d-none d-md-block">Column</div>
                          </div>
                        </div>
                      </form>
                    )}
                  />
                  {/* ) : (
                <>
               {userReqStatus === true && ( 
               <>
                <div className='alert alert-success'>
                <h2 className='text-center'>We get back to you Soon</h2> 
                <p  className='text-center'>Your Request Has Been Submitted</p>
                </div>
                <img src={BannerImg} className="img-fluid rounded-top" alt=""/>
              
                </>)}
              </>
              )} */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Whatsapp;
