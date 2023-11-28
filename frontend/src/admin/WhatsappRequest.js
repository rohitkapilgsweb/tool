import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Getwhatsapprequest, UpdateTRequest } from "../redux/actions/LoginAction";
import { getUserId } from "../utils/auth";
import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import Select from 'react-select';
import { toast } from "react-toastify";

function WhatsappRequest() {
  const [status, setStatus] = useState(false);
  const [activeUpdate, SetActiveUpdate] =useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Getwhatsapprequest()).then(
      (res) => {
        setStatus(res?.payload);
      }
    );
  }, []);

  const handelChange=(e,id)=>{
    const meberUpdate = {
      id:e.value,id,
      update:{
        status:e?.value
      }
    }

    dispatch(UpdateTRequest(meberUpdate)).then((res)=>{
      toast(res?.payload?.message)
      dispatch(Getwhatsapprequest()).then(
        (res) => {
          setStatus(res?.payload);
        }
      );
      SetActiveUpdate(0)
    })
  }
  const colourOptions = [
    { value: 'request', label: 'Request'},
    { value: 'approved ', label: 'Approved'}
  ]
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center g-2">
        <div className="col-12">
            <div className="mt-4 mb-5">
              <div className="table-responsive meintable border rounded-2">
                <table className="table position-relative w-100">
                  <thead className="bg-light sticky-top top-0">
                    <tr>
                      <th scope="col">Sr no.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Business Type</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className={status?.status === false ? "w-100 d-flex h-100 justify-content-center align-items-center": ""}>
                 
                   {status?.data?.map((item, index)=>{
                    return (
                      <>
                       <tr>
                      <td key={index}>{item?.id}</td>
                      <td key={index}>{item?.name}</td>
                      <td key={index}>{item?.phone}</td>
                      <td key={index}>{item?.bus_type}</td>
                      <td key={index}>{moment(item?.created_at).utc().format('DD-MM-YYYY')}</td>
                      <td key={index}> {activeUpdate !== item?.id ? (<span className={item?.status === 'approved'? "status-active" : "status-inactive"}>{item?.status} {activeUpdate !== item?.id && <button type="button" className="btn rounded px-0" onClick={()=>SetActiveUpdate(item?.id)}><FiEdit2  /></button>}</span>) : 
             <Select
             onChange={(e)=>handelChange(e,item?.id)}
              options={colourOptions}
            /> 
             }
           </td>
                      </tr>
                      </>
                    )
                   })}
                      {status?.status === false && ( 
                      <>
                      {status?.message}
                      </>
                    )}
                    
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsappRequest;
