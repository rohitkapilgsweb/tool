import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { approvePendingRequest, getUserTypeList } from "../../../redux/adminmanagement/admin";
import { apibasePath } from "../../../config";
import { toast } from "react-toastify";

function AdminManagementTable() {
  const dispatch = useDispatch()
  const json = [
    {
      DisplayName: "Sub Admin",
      key: "SubAdmin",
      data: "",
      className: "",
    },
    {
      DisplayName: "Account Admin",
      key: "accountAdmin",
      data: "",
      className: "",
    },
    {
      DisplayName: "Approvals",
      key: "approvals",
      data: "",
      className: "",
    },
  ];
  const [active, setActive] = useState("SubAdmin");
  const [activeTab, setActiveTab] = useState(json[0]);
  const [dataValue, setDataValue] = useState(0);
  const [selectUserType, setSelectUserType] = useState('')

  const subAdminHeading = [
    "No.",
    "UserType",
    "Name",
    "Email",
    "Contact",
    "Category",
    "Sub Category",
    "Field",
    "Action",
    "Usename",
    "Password",
  ];
  const subAdminData = [
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      category: "Corporate",
      subcategory: "Study Goals",
      Field: "Reasoning",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      category: "Corporate",
      subcategory: "Study Goals",
      Field: "Reasoning",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      category: "Corporate",
      subcategory: "Study Goals",
      Field: "Reasoning",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      category: "Corporate",
      subcategory: "Study Goals",
      Field: "Reasoning",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      category: "Corporate",
      subcategory: "Study Goals",
      Field: "Reasoning",
      username: "1@gmail.com",
      password: "1234",
    },
  ];
  const accountAdminHeading = [
    "No.",
    "UserType",
    "Name",
    "Email",
    "Contact",
    "Entity Type",
    "Entity Name",
    "Sub Entity",
    "Action",
    "Usename",
    "Password",
  ];

  const approvalsHeading = [
    "No.",
    "UserType",
    "Name",
    "E-mail",
    "IdProof",
    "Verification",
    "Action",
  ]

  const head2 = [
    "No.",
    "UserType",
    "Name",
    "E-mail",
    "IdProof",
    "Action",
  ]

  const accountAdminData = [
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      entitytype: "College",
      entityname: "Chandigarh University",
      subentity: "Associate Course",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      entitytype: "College",
      entityname: "Chandigarh University",
      subentity: "Associate Course",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      entitytype: "College",
      entityname: "Chandigarh University",
      subentity: "Associate Course",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      entitytype: "College",
      entityname: "Chandigarh University",
      subentity: "Associate Course",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      entitytype: "College",
      entityname: "Chandigarh University",
      subentity: "Associate Course",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      entitytype: "College",
      entityname: "Chandigarh University",
      subentity: "Associate Course",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      entitytype: "College",
      entityname: "Chandigarh University",
      subentity: "Associate Course",
      username: "1@gmail.com",
      password: "1234",
    },
    {
      usertype: "Student",
      name: "Abhishek",
      email: "a@gmail.com",
      contact: "1234567890",
      entitytype: "College",
      entityname: "Chandigarh University",
      subentity: "Associate Course",
      username: "1@gmail.com",
      password: "1234",
    },
  ];
  const handleTab = (key, index) => {
    setActive(key);
    setActiveTab(json.find((ele) => ele.key === active));
    // setData(tableData[key]);
    setDataValue(index);
  };
  const router = useRouter();

  const approvalListUsertype = useSelector((state) => state?.adminData?.approvalList?.rows)

  useEffect(() => {
    if (selectUserType) {
      dispatch(getUserTypeList({
        userType: selectUserType
      }))
    }
  }, [`${selectUserType}`])

  useEffect(() => {
    dispatch(getUserTypeList({
      userType: 'Organisation'
    }))
  }, [])

  const onDownload = (filepath) => {
    fetch(
      `${apibasePath}documents/userProfile/${filepath}`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }

  const onDownloadVerifiedDoc = (filepath) => {
    fetch(
      `${apibasePath}documents/userProfile/${filepath}`
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = Date.now();
        a.click();
      });
    });
  }

  const handleApprove = (id) => {
    dispatch(approvePendingRequest({
      PendingRequest: [
        {
          id: id,
          active: true
        }
      ]
    })).then((res) => {
      if (res?.payload?.success) {
        let status = res?.payload?.data[0]?.status
        toast.success(status);
        dispatch(getUserTypeList({
          userType: selectUserType
        }))
      } else {
        toast.error("error");
      }
    });
  }

  const handleReject = (id) => {
    dispatch(approvePendingRequest({
      PendingRequest: [
        {
          id: id,
          active: false
        }
      ]
    })).then((res) => {
      if (res?.payload?.success) {
        let status = res?.payload?.data[0]?.status
        toast.success(status);
        dispatch(getUserTypeList({
          userType: selectUserType
        }))
      } else {
        toast.error("error");
      }
    });
  }

  return (
    <>
      <div className="admin_home_tabs_row  bottom_border_mobile">
        <Row>
          <Col xl={6} lg={12} md={12} className="p-0">
            <div className="d-flex table_heading_header_sub_admin p-0">
              <ScrollingCarousel show={5.5} slide={4} swiping={true}>
                <ul className="nav">
                  {json &&
                    json?.map((steps, stepsIndex) => (
                      <li className="nav-item" key={stepsIndex}>
                        <a
                          className={`nav-link admin_tabs_name ${dataValue === stepsIndex && "head-active"
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
              {dataValue == 1 ? null : <div className="enteries_input ms-3 mt-0 hide_btn_row">
                <h6 className="enteries_input_label">Show Ent.</h6>
                <Form.Select aria-label="Default select example">
                  <option>10</option>
                  <option value="1">3</option>
                  <option value="2">5</option>
                  <option value="3">8</option>
                </Form.Select>
              </div>}


              {dataValue == 2 && <div className="enteries_input ms-3 mt-0 hide_btn_row">
                <Form.Select aria-label="Default select example" onChange={(e) => setSelectUserType(e.target.value)} value={selectUserType}>
                  <option value="Organisation">Organisation</option>
                  <option value="Mentor">Mentor</option>
                  <option value="HR_Professional">HR Professional</option>
                  <option value="Campus_Ambassador">Campus Ambassador</option>
                  <option value="Working_Professional">Working Professional</option>
                </Form.Select>
              </div>}

            </div>
          </Col>

          <Col
            xl={6}
            lg={12}
            md={12}
            className="text-end p-0 download_btn_set hide_btn_row"
          >
            {active === "SubAdmin" && (
              <div>
                <Button className="border_btn">Download XLSX</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("adminmanagement/addsubadmin")}
                >
                  Add New
                </Button>
              </div>
            )}
            {active === "CollegeAdmin" && (
              <div>
                <Button className="border_btn">Download XLSX</Button>
                <Button
                  className="border_btn green"
                  onClick={() => router.push("adminmanagement/addcollegeadmin")}
                >
                  Add New
                </Button>
              </div>
            )}
            {dataValue == 1 && <div className="enteries_input ms-3 mt-0 hide_btn_row">
              <h6 className="enteries_input_label">Show Enteries</h6>
              <Form.Select aria-label="Default select example">
                <option>10</option>
                <option value="1">3</option>
                <option value="2">5</option>
                <option value="3">8</option>
              </Form.Select>
            </div>}
          </Col>
        </Row>
      </div>
      {/* ---------------------------------------mobile-screen------------------------------- */}
      <Row>
        <Col lg={6} sm={6} className="display_btn_row text-start">
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
        <Col
          lg={6}
          sm={6}
          className="text-end download_btn_set display_btn_row"
        >
          {active === "SubAdmin" && (
            <div>
              <Button className="border_btn btn_margin">Download XLSX</Button>
              <Button
                className="border_btn green btn_margin"
                onClick={() => router.push("adminmanagement/addsubadmin")}
              >
                Add New
              </Button>
            </div>
          )}
          {active === "CollegeAdmin" && (
            <div>
              <Button className="border_btn btn_margin">Download XLSX</Button>
              <Button
                className="border_btn green"
                onClick={() => router.push("adminmanagement/addcollegeadmin")}
              >
                Add New
              </Button>
            </div>
          )}
        </Col>
      </Row>
      {/* ------------------------------------------end-------------------------------------- */}
      {active === "SubAdmin" && (
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {subAdminHeading.map((hd, index) => {
                return (
                  <th className="table_head" key={index}>
                    {hd}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {subAdminData &&
              subAdminData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.usertype}
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
                      {item.category}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.subcategory}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.Field}
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
                    <td className="text-center admin_table_data">
                      {item.username}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.password}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      {active === "accountAdmin" && (
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {accountAdminHeading.map((hd, index) => {
                return (
                  <th className="table_head" key={index}>
                    {hd}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {accountAdminData &&
              accountAdminData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.usertype}
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
                      {item.entitytype}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.entityname}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.subentity}
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
                    <td className="text-center admin_table_data">
                      {item.username}
                    </td>
                    <td className="text-center admin_table_data">
                      {item.password}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}

      {/* -------------approvals---------------- */}

      {active === "approvals" && (
        <Table responsive className="admin_table" bordered hover>
          <thead>
            <tr>
              {
                (selectUserType === "Organisation" || selectUserType === "HR_Professional")
                  ?
                  approvalsHeading.map((hd, index) => {
                    return (
                      <th className="table_head" key={index}>
                        {hd}
                      </th>
                    );
                  })
                  :
                  head2.map((hd, index) => {
                    return (
                      <th className="table_head" key={index}>
                        {hd}
                      </th>
                    );
                  })
              }
            </tr>
          </thead>
          <tbody>
            {approvalListUsertype &&
              approvalListUsertype?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center admin_table_data">
                      {index + 1}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.userType}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.name}
                    </td>
                    <td className="text-center admin_table_data">
                      {item?.email}
                    </td>
                    <td className="text-center admin_table_data">
                      <Button className="border_btn table_btn" onClick={() => onDownload(item?.idProof)} >Download</Button>
                    </td>

                    {selectUserType === "HR_Professional" &&
                      <td className="text-center admin_table_data">
                        <Button className="border_btn table_btn" onClick={() => onDownloadVerifiedDoc(item?.verifiedDocument)} >Download</Button>
                      </td>
                      || selectUserType === "Organisation" &&
                      <td className="text-center admin_table_data">
                        <Button className="border_btn table_btn" onClick={() => onDownloadVerifiedDoc(item?.verifiedDocument)} >Download</Button>
                      </td>
                    }
                    <td className="text-center admin_table_data no_wrap_no">
                      <>
                        <Button
                          className="border_btn table_btn"
                          onClick={() => handleReject(item?.id)}
                        >
                          Reject
                        </Button>
                        <Button
                          className="border_btn green table_btn"
                          onClick={() => handleApprove(item?.id)}
                        >
                          Approve
                        </Button>
                      </>
                    </td>

                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default AdminManagementTable;
