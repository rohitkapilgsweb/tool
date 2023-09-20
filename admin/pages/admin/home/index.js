import React from "react";
import AdminHomePage from "../../../components/admin/Home";

const Home = () => {
  let tableData = require('./tabledata.json')
  return <>
    <AdminHomePage tableData={tableData} />
  </>;
};

export default Home;
