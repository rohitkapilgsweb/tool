import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

function UserLeadAnalyticsTable() {
  const json = [
    {
      DisplayName: "College",
      key: "College",
      data: "",
      className: "",
    },
    {
      DisplayName: "Counselling",
      key: "Counselling",
      data: "",
      className: "",
    },
    {
      DisplayName: "IELTS",
      key: "IELTS",
      data: "",
      className: "",
    },
    {
      DisplayName: "Corporate",
      key: "Corporate",
      data: "",
      className: "",
    },
    {
      DisplayName: "Job Post",
      key: "JobPost",
      data: "",
      className: "",
    },
  ];
  const [active, setActive] = useState("College");
  const [activeTab, setActiveTab] = useState(json[0]);
  const [dataValue, setDataValue] = useState(0);
  const collegeHeading = [
    "No.",
    "Name",
    "Email",
    "Contact",
    "Country",
    "city",
    "College",
    "Course",
    "Action",
  ];
  const collegeData = [
    {
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      country: "India",
      college: "Chandigarh University",
      city: "mohali",
      course: "B.tech",
    },
    {
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      country: "India",
      college: "Chandigarh University",
      city: "mohali",
      course: "B.tech",
    },
    {
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      country: "India",
      college: "Chandigarh University",
      city: "mohali",
      course: "B.tech",
    },
    {
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      country: "India",
      college: "Chandigarh University",
      city: "mohali",
      course: "B.tech",
    },
    {
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      country: "India",
      college: "Chandigarh University",
      city: "mohali",
      course: "B.tech",
    },
    {
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      country: "India",
      college: "Chandigarh University",
      city: "mohali",
      course: "B.tech",
    },
    {
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      country: "India",
      college: "Chandigarh University",
      city: "mohali",
      course: "B.tech",
    },
  ];
  const corporateHeading = [
    "No.",
    "Name",
    "Email",
    "Contact",
    "Education",
    "Experience",
    "Category",
    "Field",
    "Location",
    "Date",
    "Action",
  ];
  const corporatedata = [
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "MBA",
      experience: "Graduate",
      catgeory: "Human Resources",
      subcategory: "Payroll",
      location: "Delhi",
      date: "12-12-2022",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "MBA",
      experience: "Graduate",
      catgeory: "Human Resources",
      subcategory: "Payroll",
      location: "Delhi",
      date: "12-12-2022",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "MBA",
      experience: "Graduate",
      catgeory: "Human Resources",
      subcategory: "Payroll",
      location: "Delhi",
      date: "12-12-2022",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "MBA",
      experience: "Graduate",
      catgeory: "Human Resources",
      subcategory: "Payroll",
      location: "Delhi",
      date: "12-12-2022",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "MBA",
      experience: "Graduate",
      catgeory: "Human Resources",
      subcategory: "Payroll",
      location: "Delhi",
      date: "12-12-2022",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "MBA",
      experience: "Graduate",
      catgeory: "Human Resources",
      subcategory: "Payroll",
      location: "Delhi",
      date: "12-12-2022",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "MBA",
      experience: "Graduate",
      catgeory: "Human Resources",
      subcategory: "Payroll",
      location: "Delhi",
      date: "12-12-2022",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "MBA",
      experience: "Graduate",
      catgeory: "Human Resources",
      subcategory: "Payroll",
      location: "Delhi",
      date: "12-12-2022",
    },
  ];
  const jobpostHeading = [
    "No.",
    "Name",
    "Email",
    "Contact",
    "Education",
    "Experience",
    "Post",
    "Post by",
    "Entity Type",
    "Entity Name",
    "Post Date",
    "Action",
  ];
  const jobpostdata = [
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "graduate",
      experience: "1yr",
      post: "We are looking for",
      postby: "Vineet",
      entitytype: "",
      entityname: "",
      postdate: "Payroll",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "graduate",
      experience: "1yr",
      post: "We are looking for",
      postby: "Vineet",
      entitytype: "",
      entityname: "",
      postdate: "Payroll",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "graduate",
      experience: "1yr",
      post: "We are looking for",
      postby: "Vineet",
      entitytype: "",
      entityname: "",
      postdate: "Payroll",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "graduate",
      experience: "1yr",
      post: "We are looking for",
      postby: "Vineet",
      entitytype: "",
      entityname: "",
      postdate: "Payroll",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "graduate",
      experience: "1yr",
      post: "We are looking for",
      postby: "Vineet",
      entitytype: "",
      entityname: "",
      postdate: "Payroll",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "graduate",
      experience: "1yr",
      post: "We are looking for",
      postby: "Vineet",
      entitytype: "",
      entityname: "",
      postdate: "Payroll",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "graduate",
      experience: "1yr",
      post: "We are looking for",
      postby: "Vineet",
      entitytype: "",
      entityname: "",
      postdate: "Payroll",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      education: "graduate",
      experience: "1yr",
      post: "We are looking for",
      postby: "Vineet",
      entitytype: "",
      entityname: "",
      postdate: "Payroll",
    },
  ];
  const selectoptions = [
    "Script",
    "Announcement",
    "Jobs",
    "Internship",
    "Mentoring",
    "Question",
    "Services",
    "College festives",
    "scholarship",
    "cultural events",
    "conferences",
    "competitions",
    "hackathon",
    "Hiring Challenges",
    "Campus Recruitment",
  ];
  const handleTab = (key, index) => {
    setActive(key);
    setActiveTab(json.find((ele) => ele.key === active));
    // setData(tableData[key]);
    setDataValue(index);
  };
  return (
    <>
      <div className="admin_home_tabs_row  bottom_border_mobile">
        <Row>
          <Col xl={6} lg={12} md={12} className="p-0">
            <div className="d-flex table_heading_header table_heading_header_sub_admin p-0">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav">
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
                  {active === "JobPost" && (
                    <>
                      <select className="select_tab">
                        {selectoptions?.map((item, index) => {
                          return <option key={index}>{item}</option>
                        })}
                      </select>
                    </>
                  )}
                </ul>
              </ScrollingCarousel>
            </div>
          </Col>

          <Col
            xl={6}
            lg={12}
            md={12}
            className="user_lead_entery hide_btn_row p-0"
          >
            <div className="enteries_input location_enteries">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Form.Select aria-label="Default select example">
                <option>10</option>
                <option value="1">3</option>
                <option value="2">5</option>
                <option value="3">8</option>
              </Form.Select>
            </div>
            <div>
              <Button className="border_btn">Download XLSX</Button>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        {/* ---------------------------------------mobile-screen------------------------------- */}
        <Col lg={6} xs={6} className="display_btn_row text-start">
          <div className="d-flex mt-0">
            <h6 className="enteries_input_label mb-0 pt-2">Show Enteries</h6>
            <Form.Select aria-label="Default select example">
              <option>10</option>
              <option value="1">3</option>
              <option value="2">5</option>
              <option value="3">8</option>
            </Form.Select>
          </div>
        </Col>
        <Col xs={6}  className="text-end download_btn_set display_btn_row">
          <div>
            <Button className="border_btn btn_margin">Download XLSX</Button>
          </div>
        </Col>
        {/* ------------------------------------------end-------------------------------------- */}
      </Row>
      {active === "College" && (
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {collegeHeading.map((hd, index) => {
                return (
                  <th className="table_head" key={index}>
                    {hd}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {collegeData &&
              collegeData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.name}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.email}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.contact}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.country}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.city}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.college}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.course}
                    </td>
                    <td className="text-center admin_table_data no_wrap_no">
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/edit-icon-blue.png"
                        onClick={() => handleEdit(item)}
                      />
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/delete-icon-blue.png"
                        onClick={() => {
                          setModalShow(true);
                          setDeleteItem(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      {active === "Counselling" && (
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {collegeHeading.map((hd, index) => {
                return (
                  <th className="table_head" key={index}>
                    {hd}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {collegeData &&
              collegeData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.name}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.email}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.contact}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.country}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.city}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.college}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.course}
                    </td>
                    <td className="text-center admin_table_data">
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/edit-icon-blue.png"
                        onClick={() => handleEdit(item)}
                      />
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/delete-icon-blue.png"
                        onClick={() => {
                          setModalShow(true);
                          setDeleteItem(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      {active === "IELTS" && (
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {collegeHeading.map((hd, index) => {
                return (
                  <th className="table_head" key={index}>
                    {hd}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {collegeData &&
              collegeData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.name}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.email}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.contact}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.country}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.city}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.college}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.course}
                    </td>
                    <td className="text-center admin_table_data">
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/edit-icon-blue.png"
                        onClick={() => handleEdit(item)}
                      />
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/delete-icon-blue.png"
                        onClick={() => {
                          setModalShow(true);
                          setDeleteItem(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      {active === "Corporate" && (
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {corporateHeading.map((hd, index) => {
                return (
                  <th className="table_head" key={index}>
                    {hd}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {corporatedata &&
              corporatedata?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.name}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.email}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.contact}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.education}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.experience}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.catgeory}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.subcategory}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.location}
                    </td>
                    <td className="text-center admin_table_data no_wrap_no">
                      {item.date}
                    </td>
                    <td className="text-center admin_table_data  no_wrap_no">
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/edit-icon-blue.png"
                        onClick={() => handleEdit(item)}
                      />
                      <img
                        className="mx-1 admin_table_action_icon"
                        src="/images/delete-icon-blue.png"
                        onClick={() => {
                          setModalShow(true);
                          setDeleteItem(item);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      {active === "JobPost" && (
        <>
          <Table responsive className="admin_table" bordered hover>
            <thead>
              <tr>
                {jobpostHeading.map((hd, index) => {
                  return (
                    <th className="table_head no_wrap_no" key={index}>
                      {hd}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {jobpostdata &&
                jobpostdata?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center admin_table_data">
                        {index + 1}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.name}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.email}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.contact}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.education}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.experience}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.post}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.postby}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.entitytype}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.entityname}
                      </td>
                      <td className="text-center admin_table_data">
                        {item.postdate}
                      </td>
                      <td className="text-center admin_table_data no_wrap_no">
                        <img
                          className="mx-1 admin_table_action_icon"
                          src="/images/edit-icon-blue.png"
                          onClick={() => handleEdit(item)}
                        />
                        <img
                          className="mx-1 admin_table_action_icon"
                          src="/images/delete-icon-blue.png"
                          onClick={() => {
                            setModalShow(true);
                            setDeleteItem(item);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default UserLeadAnalyticsTable;
