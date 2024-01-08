import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Getwhatsapprequest, UpdateHelp, UpdateTRequest, getHelpTicket } from "../redux/actions/LoginAction";
import { getUserId } from "../utils/auth";
import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import Select from 'react-select';
import { toast } from "react-toastify";
import CommonModal from "./components/CommonModal";
import HelpTicketInputs from "./components/HelpTicketInputs";
import Loader from "../Page/Components/Loader";

function HelpTicket() {
    const [status, setStatus] = useState(false);
    const [bodyselect, setBodyselect] = useState(0)
    const [show, setShow] = useState()
    const [activeUpdate, SetActiveUpdate] =useState()
    const [isLoading, setIsLoading] =useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getHelpTicket()).then((res)=>[
        setStatus(res?.payload)
      ])
      
    }, []);
  
    const handelChange = (e) =>{
      setShow(true)
      SetActiveUpdate(e)
    };
    const handleClose = () =>{
      setShow(false)
      dispatch(getHelpTicket()).then((res)=>{
        setStatus(res?.payload)
      })
    };

    const colourOptions = [
      { value: 'solved', label: 'Solved'},
      { value: 'pending', label: 'Pending'}
    ]

const handelChanges=(e,id)=>{
  // setBodyselect(e.value)
  const data={
    id: id,
    data: {status: e?.value?.toLowerCase()}
  }
  setIsLoading(true);
  dispatch(UpdateHelp(data)).then((res)=>{
    dispatch(getHelpTicket()).then((res)=>{
      setStatus(res?.payload)
      setIsLoading(false)
    })
    setBodyselect(0);
})
}

  return (
    <div className="container">
      {isLoading && <Loader/>}
    <div className="row justify-content-center align-items-center g-2">
      <div className="col-12">
          <div className="mt-4 mb-5">
            <div className="table-responsive meintable border rounded-2">
              <table className="table position-relative w-100">
                <thead className="bg-light sticky-top top-0">
                  <tr>
                    <th scope="col">Sr no.</th>
                    <th scope="col">Issue</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                 {status?.data?.slice()?.reverse()?.map((item, index)=>{
                    return (
                      <tr key={item?.id}>
                      <td ><span className="text-solved align-auto">{item?.ticket_id} </span></td>
                      <td ><span className="text-solved align-auto">{item?.issue}</span></td>
                      <td > {bodyselect !== item?.id ? ( <span className={`d-flex justify-content-center align-items-center py-2 ${item?.status ==="solved" ? "status-active" : "status-inactive"}`}>{item?.status} <button type="button" className="btn rounded px-0 ms-4 py-0" onClick={()=>setBodyselect(item?.id)}><FiEdit2  /></button> </span> 
                      ) :<Select
                      classNamePrefix={"react-selectinput "}
                        onChange={(e)=>handelChanges(e,item?.id)}
                        options={colourOptions}
                        />  }
                      </td>
                      <td ><span className="text-solved align-auto">{moment(item?.created_at).utc().format('DD-MM-YYYY')} </span></td>
                      <td ><button className="btn btn text-white py-2 fs-4 " onClick={()=>handelChange(item)} style={{ background:"var(--theme-mein)" }}>View</button></td>
                      </tr>
                    )
                 })}                  
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
    <CommonModal 
    Title="Help Center"
    show={show} 
    size={'lg'} 
    handleCloseBtn={handleClose} 
    Content={<HelpTicketInputs data={activeUpdate} close={handleClose}/>}
    />

  </div>
  )
}

export default HelpTicket
