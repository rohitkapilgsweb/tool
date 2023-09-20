import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AdminTable from "../AdminTable";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

const AdminHomePage = (props) => {
  const { tableData } = props;

  const handleDelete = (index) => {
    console.log("delete index", index);
  };

  const action = {
    delete: {
      src: "/images/delete-icon.png",
      action: handleDelete,
    },
  };

  const [active, setActive] = useState("postList");
  const [data, setData] = useState(tableData.PostList);
  const [dataValue, setDataValue] = React.useState(0);

  const json = [
    {
      DisplayName: "PostList",
      key: "PostList",
      data: tableData,
      className: "admin_home_tabs",
    },
    {
      DisplayName: "Post Report List",
      key: "PostReportList",
      data: tableData,
      className: "",
    },
    {
      DisplayName: "Comment List",
      key: "CommentList",
      data: tableData,
      className: "",
    },
    {
      DisplayName: "Comment Report List",
      key: "CommentReportList",
      data: tableData,
      className: "",
    },
  ];
  const [activeTab, setActiveTab] = useState(json[0]);

  const handleTab = (key, index) => {
    setActive(key);
    setActiveTab(json.find((ele) => ele.key === active));
    setData(tableData[key]);
    setDataValue(index);
  };
  return (
    <div>
      <div className=" admin_home_tabs_row">
        <Row>
          <Col lg={10} md={12} className="p-0">
          <ScrollingCarousel show={5.5} slide={4} swiping={true}>
            <ul className="nav ">
              {json &&
                json?.map((steps, stepsIndex) => (
                  <li className="nav-item" key={stepsIndex}>
                    <a
                      className={`nav-link admin_tabs_name ${
                        dataValue === stepsIndex && "head-active"
                      }`}
                      active={true}
                      onClick={() => handleTab(steps.key, stepsIndex)} 
                    >
                      {steps.DisplayName}
                    </a>
                  </li>
                ))}
            </ul>
            </ScrollingCarousel>
          </Col>
          <Col lg={2} md={6} className="p-0 hide_btn_row">
            <div className="enteries_input">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Form.Select aria-label="Default select example">
                <option>10</option>
                <option value="1">3</option>
                <option value="2">5</option>
                <option value="3">8</option>
              </Form.Select>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="display_btn_row">
        <Col className=" item_end">
        <div className="d-flex mb-3">
              <h6 className="enteries_input_label mb-0 pt-2">Show Enteries</h6>
              <Form.Select aria-label="Default select example">
                <option>10</option>
                <option value="1">3</option>
                <option value="2">5</option>
                <option value="3">8</option>
              </Form.Select>
            </div>
        </Col>
      </Row>
     
      {/* <hr /> */}
      <div className="admin_table">
        <AdminTable data={data} action={action} />
      </div>
    </div>
  );
};

export default AdminHomePage;
