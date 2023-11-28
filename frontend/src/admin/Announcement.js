import React,{useRef, useState} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import CreateTemplates from "./components/CreateTemplates";
import AllEmailTemplate from "./AllEmailTemplate";
function Announcement() {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="menu-box Post-tabs ">
            <Tabs
              defaultActiveKey="allTemp"
              id="uncontrolled-tab-example"
              className="mt-3 gap-3  mb-3"
            >
              <Tab
                eventKey="allTemp"
                title={
                  <>
                    <span className="white-space">All Templates</span>
                  </>
                }
              >
              <AllEmailTemplate/>
              </Tab>
              <Tab
                eventKey="bulkemal"
                title={
                  <>
                    <span className="white-space">Bulk Email</span>
                  </>
                }
              >
                Secound
              </Tab>
              <Tab
                eventKey="history"
                title={
                  <>
                    <span className="white-space">History</span>
                  </>
                }
              >
                schedule
              </Tab>
              <Tab
                eventKey="Publish"
                title={
                  <>
                    <span className="white-space">Cron Job</span>
                  </>
                }
              >
                Publish
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
