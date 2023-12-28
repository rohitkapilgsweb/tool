import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { SaveHelpTicket } from "../redux/actions/LoginAction";
import { toast } from "react-toastify";
import Loader from "./Components/Loader";
import { MdCancel } from "react-icons/md";
function HelpRequest() {
  const dispatch = useDispatch();
  const [fileData, setFleData] = useState()
  const [isLoader, setIsLoader] = useState(false)
  const [previewImage, setPreviewImage] = useState(null);

  
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
                        <div className="col-md-12">
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
                    </div>
                </div>      
            </form>
        )}
    />
);

}

export default HelpRequest;
