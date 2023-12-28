import React, { useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { UpdateHelp } from '../../redux/actions/LoginAction';
import { useDispatch } from 'react-redux';

function HelpTicketInputs(props) {
    const [replys,SetReplys]= useState()
    const dispatch = useDispatch()
    const data = props?.data

    const payloadData = {
        id:data?.id,
        data: {reply:replys}
    }

    const replyTecket = () =>{
        dispatch(UpdateHelp(payloadData)).then((res)=>{
            console.log(res?.payload,"pauyload")
            props.close()
        })
    }

  return (
    <div className='help-wrrapper'>
        <h6 className='lable-id'>Ticket ID: {data?.ticket_id}</h6>
        <div className='help-box'>
            <h5><b>Subject: <span className='text-capitalization'>{data?.issue}</span></b></h5>
            <div className='Msg-reply d-flex mb-3 flex-column'>
                <p >Description: <span><i>{data?.desc}</i></span></p>
                <img
                        src={`https://api.optimizsync.com/social/public/images/help/${data?.image}`}
                        alt="Preview"
                        className="w-100 h-100 mb-3 rounded"
                        style={{
                          Width: "100%",
                          Height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                <p className='bg-light p-3 rounded'><b>Solution </b><br/> <span className='mt-3'><i>{data?.reply}</i></span></p>
            </div>
            <textarea type='text' className='W-100 form-control' placeholder='Write Solution..' onChange={(e)=> SetReplys(e.target.value) } />
        </div>
        <button
            onClick={replyTecket}
            type="button"
            className="btn btn-outline-primary mt-3">
            <BsFillSendFill /> Replay
        </button>
        
    </div>
  )
}

export default HelpTicketInputs
