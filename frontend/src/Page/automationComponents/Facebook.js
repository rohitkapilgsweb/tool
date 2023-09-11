import React from 'react'
import FB_Settings from './Facebook/FB_Settings'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
function Facebook() {
  return (
    <div color="container pt-4">
    <div className="row justify-content-center align-items-center m-0 ">
     <div className="col  px-5">
 <div className="menu-box" >
 <Tabs
   defaultActiveKey="Introduction"
   id="uncontrolled-tab-example"
   className=""
 >
   <Tab eventKey="Introduction" title="Introduction">
  First
   </Tab>
   <Tab eventKey="SendMessage" title="Send Message">
   Secound
   </Tab>
   <Tab  eventKey="Setting" title="Setting" >
    <FB_Settings />
   </Tab>
  
 </Tabs>
 </div>
     </div>
    </div>
   </div>
  )
}

export default Facebook
