import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Signupdashboard from "./signupdashboard";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// const data = {
//   labels,
//   datasets: [
//     {
//     //   label: "Dataset 1",
//       data: [12, 19, 13, 15, 12, 13, 12, 14, 18, 11, 10, 16],
//       backgroundColor: "#6858E7",
//       borderColor: "",
//       color: "#6858E7",
//       borderWidth: 1
//     },
//   ],
// };
// const options = {
//   scales: {
//     yAxes: [
//       {
//         gridLines: {
//           color: "red",
//         },
//       },
//     ],
//     xAxes: [
//       {
//         gridLines: {
//           color: "blue",
//         },
//       },
//     ],
//   },
// };

function DashboardPage() {
  const tabJson = [
    {
      DisplayName: "Bulletin",
      key: "SubAdmin",
      data: "",
      className: "",
    },
    {
      DisplayName: "Signups",
      key: "CollegeAdmin",
      data: "",
      className: "",
    },
  ];
  const [active, setActive] = useState("SubAdmin");
  const [activeTab, setActiveTab] = useState(tabJson[0]);
  const [dataValue, setDataValue] = useState(0);
  const handleTab = (key, index) => {
    console.log(activeTab, "key");
    setActive(key);
    setActiveTab(tabJson.find((ele) => ele.key === active));
    // setData(tableData[key]);
    setDataValue(index);
  };
  const router = useRouter();

  return (
    <>
      <div className="admin_home_tabs_row">
        <Row>
          <Col lg={6} md={12} className="p-0">
            <div className="d-flex table_heading_header p-0">
              <ul className="nav tabs_scroll">
                {tabJson &&
                  tabJson?.map((steps, stepsIndex) => (
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
            </div>
          </Col>
          <Col lg={6} md={12} className="user_lead_entery p-0">
            {active === "CollegeAdmin" && (
              <div className="enteries_input location_enteries pt-1">
                <h6 className="enteries_input_label">Show Enteries</h6>
                <Form.Select aria-label="Default select example">
                  <option>10</option>
                  <option value="1">3</option>
                  <option value="2">5</option>
                  <option value="3">8</option>
                </Form.Select>
              </div>
            )}
            {active === "CollegeAdmin" && (
              <div>
                <Button className="border_btn">Download XLSX</Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
      {active === "SubAdmin" && (
        <Row>
          <Col lg={4}></Col>
          <Col lg={8}>
            <Signupdashboard />
          </Col>
        </Row>
      )}
      {active === "CollegeAdmin" && "tabel"}
    </>
  );
}

export default DashboardPage;
