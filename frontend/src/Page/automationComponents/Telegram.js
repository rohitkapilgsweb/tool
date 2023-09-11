import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Intro from "./Telegram/intro";
import SendMessege from "./Telegram/SendMessege";
import Setting from "./Telegram/Setting";
function Telegram() {

  return (
    <>
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
        <Intro/>
      </Tab>
      <Tab eventKey="SendMessage" title="Send Message">
        <SendMessege/>
      </Tab>
      <Tab  eventKey="Setting" title="Setting" >
       <Setting />
      </Tab>
     
    </Tabs>
    </div>
        </div>
       </div>
      </div>
    </>
  );
}

export default Telegram;
