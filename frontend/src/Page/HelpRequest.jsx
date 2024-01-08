import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { SaveHelpTicket, singleUserHelp } from "../redux/actions/LoginAction";
import { toast } from "react-toastify";
import Loader from "./Components/Loader";
import { MdCancel } from "react-icons/md";
import CommonModal from "../admin/components/CommonModal";
import DataIssuesDetails from "./DataIssuesDetails";
function HelpRequest() {
  const dispatch = useDispatch();
  const [fileData, setFleData] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [userHelpData, setUserHelpData] = useState(null);
  const [issueData, setIssueData] = useState(null);
  const [show, setShow] = useState()
  

  const handelChange = (item) =>{
    setIssueData(item);
    setShow(true)
  };
  const handleClose = () =>{
    setShow(false)
  };

  useEffect(()=>{
    dispatch(singleUserHelp()).then((res)=>{
        setUserHelpData(res.payload.data)
    })
  },[])
console.log(userHelpData)
  const onchange = (e,values) =>{
    const formData = new FormData();
    const file  = e?.target?.files[0]
    if (file) {
        // Display a preview of the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
      console.log(file?.name)
      formData.append('image', file);
      formData.append('issue', values?.issue);
      formData.append('desc', values?.desc);
      formData.append('status', "pending");
      setFleData(formData)
    };
  

  const onSubmit = async (values,form) => {
    if(fileData){
        setIsLoader(true)
        dispatch(SaveHelpTicket(fileData)).then((res)=>{
            dispatch(singleUserHelp()).then((res)=>{
                setUserHelpData(res.payload.data)
            })
            toast(res?.payload?.status)
            setIsLoader(false)
            setPreviewImage(null)
         })
    }else{
        const Datpayload={
            issue: values?.issue,
            desc: values?.desc,
            status:"pending"
        }
        setIsLoader(true)
        dispatch(SaveHelpTicket(Datpayload)).then((res)=>{
            dispatch(singleUserHelp()).then((res)=>{
                setUserHelpData(res.payload.data)
            })
            toast(res?.payload?.status)
            setIsLoader(false)
            setPreviewImage(null)
        
         })
    }
    values.desc = ''
    values.issue = ''
    };

return (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit,values }) => (
            <form onSubmit={handleSubmit}>
                <div className="container pt-4 px-5">
                    {isLoader && <Loader/>}
                    <div className="row">
                    <div className="col-md-12">
                        <h3 className="mb-3">Feedback & Support</h3>
                    </div>
                        <div className="col-md-6">
                            <div className="input-errapermb-3 mb-3">
                                <Field component="input" className="feedback-input " type="text" placeholder="Your issue.." name="issue" />
                            </div>
                            <div className="input-errapermb-3 mb-3">
                                <Field component="textarea" className="feedback-input" placeholder="Discribe about the problem..." id="textarea" type="text" name="desc" />
                            </div>
                            <div className="input-errapermb-3">
                                
                            {previewImage ? (
                                <div className="img-prvew-box">
                                <span onClick={()=>setPreviewImage(null)} ><MdCancel size={28} color="#ff0000"/></span>
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-100 h-100 rounded"
                                    style={{
                                    Width: "100%",
                                    Height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    }}
                                />
                                </div>
                            ): <Field component="input" className="form-control feedback-input"  type="file" name="image" onChange={(e)=>onchange(e, values)} />}
                               
                            </div>
                            <button type="submit"  className="btn hero-body mt-3">Save</button>
                        </div>
                        <div className="col-md-6">
                            <table className="table table-responsive">
                                <thead className="shadow-sm">
                                    <tr>
                                        <th>Issues</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                               
                                {userHelpData === null ? (
                                    <>
                                    <div>No Data Found</div></>
                                ):(<>
                                    <tbody>
                                    {userHelpData?.slice()?.reverse()?.map((item)=>{
                                        return (
                                    <tr key={item?.id}>
                                        <td>{item?.issue}</td>
                                        <td><span className={`d-flex justify-content-center align-items-center py-2 ${item?.status === 'pending'? "status-inactive" : "status-active"}`}>{item?.status}</span></td>
                                        <td><button
                                        onClick={()=>handelChange(item)}
                                            type="button"
                                            class="btn btn-outline-primary"
                                        >
                                            View
                                        </button>
                                        </td>
                                    </tr>
                                        )
                                    })}
                                    
                                </tbody>

                                </>)}
                            </table>
                        </div>
                    </div>
                </div>      
                <CommonModal 
                Title="Help Center"
                show={show} 
                size={'lg'} 
                handleCloseBtn={handleClose} 
                Content={<DataIssuesDetails data={issueData ? issueData :""}/>}
                />

            </form>
        )}
        
    />
);

}

export default HelpRequest;

