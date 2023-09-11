import React, { useEffect, useState } from 'react'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PlaceSearch from './Google/PlaceSearch';
import CommingSoon from '../CommingSoon';
function Google() {
  


  return (

   <div color="container pt-4">
    <div className="row justify-content-center align-items-center m-0  ">
     <div className="col  px-lg-5">
 <div className="menu-box" >
 <Tabs
   defaultActiveKey="GoogleSearch"
   id="uncontrolled-tab-example"
   className=""
 >
   <Tab eventKey="GoogleSearch" title="Google Busines Places">
 <PlaceSearch/>
   </Tab>
  
 </Tabs>
 </div>
     </div>
    </div>
   </div>


  )
}

export default Google