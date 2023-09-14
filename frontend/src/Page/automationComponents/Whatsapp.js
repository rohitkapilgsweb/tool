import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {AiFillMessage, AiOutlineMail} from 'react-icons/ai'
import { MdOutlineWebhook } from 'react-icons/md';
import {RiSettings3Fill} from 'react-icons/ri'
import SingleMessege from './Whatsapp/SingleMessege';
function Whatsapp() {
  return (
    <div color="container pt-4">
    <div className="row justify-content-center align-items-center m-0 ">
     <div className="col  px-5 mt-3">
 <div className="menu-box Post-tabs " >

 <Tabs
   defaultActiveKey="SingleMessege"
   id="uncontrolled-tab-example"
   className="mt-3 gap-3  mb-3"
 >
   <Tab eventKey="Configration" title={<><RiSettings3Fill size={20}/> <span className='white-space'> Configration</span></>}>
Cooming Soon
   </Tab>
   <Tab eventKey="BulkMessege" title={<><AiFillMessage size={20}/> <span className='white-space'> Bulk Messege</span></>}>
   Cooming Soon
   </Tab>
   <Tab eventKey="SingleMessege" title={<><AiOutlineMail size={20}/> <span className='white-space'> Single Messege</span></>}>
   <SingleMessege/> 
   </Tab>
   <Tab  eventKey="Webhook" title={<><MdOutlineWebhook  size={20}/> <span className='white-space'> Webhook</span></>} >
   Cooming Soon
   </Tab>
  
 </Tabs>
 </div>
     </div>
    </div>



   </div>

  )
}

export default Whatsapp
