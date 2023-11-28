import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Getwhatsapprequest, UpdateTRequest, getHelpTicket } from "../redux/actions/LoginAction";
import { getUserId } from "../utils/auth";
import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import Select from 'react-select';
import { toast } from "react-toastify";

function HelpTicket() {
    const [status, setStatus] = useState(false);
    const [activeUpdate, SetActiveUpdate] =useState(0)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getHelpTicket()).then((res)=>[
        setStatus(res?.payload)
      ])
      
    }, []);
  
    // const handelChange=(e,id)=>{
    //   const meberUpdate = {
    //     id:e.value,id,
    //     update:{
    //       status:e?.value
    //     }
    //   }
  
    //   dispatch(UpdateTRequest(meberUpdate)).then((res)=>{
    //     toast(res?.payload?.message)
    //     dispatch(Getwhatsapprequest()).then(
    //       (res) => {
    //         setStatus(res?.payload);
    //       }
    //     );
    //     SetActiveUpdate(0)
    //   })
    // }
    // const colourOptions = [
    //   { value: 'request', label: 'Request'},
    //   { value: 'approved ', label: 'Approved'}
    // ]
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
                    <th scope="col">Issue</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
               
                 {status?.data?.map((item, index)=>{
                  return (
                    <>
                     <tr key={index}>
                    <td >{item?.ticket_id}</td>
                    <td >{item?.issue}</td>
                    <td >{item?.status}</td>
                    <td >{moment(item?.created_at).utc().format('DD-MM-YYYY')}</td>
                    <td ><button className="btn btn text-white py-2 fs-4 " style={{ background:"var(--theme-mein)" }}>View</button></td>
                    </tr>
                    </>
                  )
                 })}
                        {/* {status?.status === false && ( 
                        <>
                        {status?.message}
                        </>
                    )} */}
                  
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default HelpTicket
