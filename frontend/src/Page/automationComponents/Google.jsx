import React, { useEffect, useState } from 'react'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PlaceSearch from './Google/PlaceSearch';
function Google() {
  


  return (

   <div color="container pt-4">
    <div className="row justify-content-center align-items-center ">
     <div className="col  px-5">
 <div className="menu-box" >
 <Tabs
   defaultActiveKey="GoogleSearch"
   id="uncontrolled-tab-example"
   className=""
 >
   <Tab eventKey="GoogleSearch" title="Google Busines Places">
 <PlaceSearch/>
   </Tab>
   <Tab eventKey="SendMessage" title="Send Message">
   Secound
   </Tab>
   <Tab  eventKey="Setting" title="Setting" >
    {/* <FB_Settings /> */}
   </Tab>
  
 </Tabs>
 </div>
     </div>
    </div>
   </div>


  )
}

export default Google