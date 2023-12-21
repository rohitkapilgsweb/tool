import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { MdScheduleSend } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import Select from "react-select";
import {
  getPageDetails,
  get_Facebook_Data,
  get_Facebook_Pages,
} from "../redux/actions/LoginAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Components/Loader";
import { Chart } from "react-google-charts";
import jsonData from "./sempleData/data.json";
import moment from "moment";


export const options = {
  title: "Company Performance",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "50%" },
};

function Dashboard() {
  const [getFacebookAccounts, setGetFacebookAccounts] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_Facebook_Data()).then((res) => {
      setGetFacebookAccounts(res?.payload?.data);
    });

    checkTrialStatus();
    
  }, []);
  // createTrialLink(3);


  const getPages = useSelector(
    (state) => state?.getPages?.getFacebookPages?.data
  );
  const isLoading = useSelector((state) => state?.getPages?.isLoading);
  const colourOptions = [];
  const facebookPages = [];

  getFacebookAccounts?.map((item) => {
    colourOptions.push({
      value: item?.facebook_id,
      label: item?.facebook_name,
      key: item?.facebook_token,
    });
  });
  getPages?.map((item) => {
    facebookPages.push({
      value: item?.id,
      label: item?.name,
      key: item?.access_token,
    });
  });

  const handelChange = (e) => {
    // console.log(e)
    const payloadData = {
        accessToken:{accessToken: e?.key},
        id:e?.value
    }
    dispatch(get_Facebook_Pages(payloadData));
  };


  const getDetails = (e) => {
    const PayloadData = {
      page_id: e?.id,
      metric: "page_impressions_unique,page_engaged_users",
      access_token: e?.key,
    };
    dispatch(getPageDetails(PayloadData)).then((res) => {
      console.log(res);
    });
  };

  const DateTimeExclude = (date) => {
    const timestamp = date;

    // Create a Date object from the timestamp
    const dateTime = new Date(timestamp);

    // Extract date, time, and timezone components
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");

    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getSeconds().toString().padStart(2, "0");

    // Timezone offset in minutes
    const timezoneOffsetMinutes = dateTime.getTimezoneOffset();
    const timezoneOffsetHours = Math.floor(
      Math.abs(timezoneOffsetMinutes) / 60
    );
    const timezoneOffsetSign = timezoneOffsetMinutes > 0 ? "-" : "+";

    // Format the date, time, and timezone
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedTimezone = `${timezoneOffsetSign}${timezoneOffsetHours
      .toString()
      .padStart(2, "0")}:${(Math.abs(timezoneOffsetMinutes) % 60)
      .toString()
      .padStart(2, "0")}`;

    const AllValues = {
      year: year,
      month: month,
      date: day,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      formattedDate:formattedDate,
      formattedTime:formattedTime
    };
    return AllValues;
  };


  const data = [
    [
      "Day",
      "Reach Start",
      "Reach End",
      // "last_28day",
    ],  
    ["0",0,0]
  ];



for (let i = 0; i < jsonData?.data?.length; i++) {
  data.push([DateTimeExclude(jsonData?.data[i]?.values[0].end_time)?.formattedDate + ", " + DateTimeExclude(jsonData?.data[i]?.values[1].end_time)?.formattedDate, jsonData?.data[i]?.values[0]?.value, jsonData?.data[i]?.values[1]?.value])
}


const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Trial is Expired...</div>;
  }

  return (
    <div className="timer text-center">
      <div className="text text-center">Remaining</div>
      <div className="value text-center fs-4">
        {checkTrialStatus().remainingDays}
      </div>
      <div className="text text-center">day</div>
    </div>
  );
};


function createTrialLink(durationDays) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + durationDays);

  const trialData = {
    expirationDate: expirationDate.toISOString(),
  };
  if(localStorage.getItem('trialData')){
    localStorage.removeItem('trialData')
    localStorage.setItem("trialData", JSON.stringify(trialData));
  }
  localStorage.setItem("trialData", JSON.stringify(trialData));
}

// createTrialLink(3);
function checkTrialStatus() {
  const trialDataString = localStorage.getItem("trialData");

  if (trialDataString) {
    const trialData = JSON.parse(trialDataString);
    const expirationDate = new Date(trialData.expirationDate);
    const currentDate = new Date();

    if (expirationDate > currentDate) {
      // Calculate remaining days
      const remainingDays = Math.ceil(
        (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      return {
        isActive: true,
        remainingDays: remainingDays,
      };
    }
  }

  return {
    isActive: false,
    remainingDays: 0,
  };
}


  return (
    <div className="container-fluid pt-4">
      {isLoading && <Loader />}
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-12 col-md-12  d-flex ">
            <div className="w-100">
  
            {/* <CountdownCircleTimer
            size={100}
          isPlaying
          duration={checkTrialStatus().remainingDays * 86400}
          // duration={2000}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer> */}
              {checkTrialStatus().isActive ? 
              <h1 className="text-success text-center fs-4 py-4 alert-normal">Active trial with {checkTrialStatus().remainingDays} { checkTrialStatus().remainingDays === 1 ? "day":"days"} remaining  <div className="btn btn-upgrage">Upgrage</div></h1> :
               <h1 className="text-danger text-center  fs-4 py-4 alert-normal-danger">Active trial is ended</h1>
              }
              
            </div>
        </div>
        <div className="col-lg-4 col-md-6  d-flex align-items-strech mb-3">
          <div className="home__postinfo">
            <div className="d-flex align-items-center">
              <BsFileEarmarkPostFill size={30} color="#2245aa" />
              <span className="fs-6 lable-span bg-info-subtle  text-info-emphasis">
                999
              </span>
            </div>
            <h3 className="mt-2 fs-6">Publish Posts</h3>
          </div>
        </div>
        <div className="col-lg-4 col-md-6  d-flex align-items-strech mb-3">
          <div className="home__postinfo">
            <div className="d-flex align-items-center">
              <MdScheduleSend size={30} color="#2245aa" />
              <span className="fs-6 lable-span bg-primary-subtle text-primary ">
                999
              </span>
            </div>
            <h3 className="mt-2 fs-6">Schedule Posts</h3>
          </div>
        </div>
        <div className="col-lg-4 col-md-6  d-flex align-items-strech mb-3">
          <div className="home__postinfo">
            <div className="d-flex align-items-center">
              <MdPendingActions size={30} color="#2245aa" />
              <span className="fs-6 lable-span bg-warning-subtle text-danger">
                999
              </span>
            </div>
            <h3 className="mt-2 fs-6">Darft Posts</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="mt-4 d-flex gap-3">
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              name="colors"
              placeholder="Select Accounts..."
              options={colourOptions}
              className="basic-multi-select w-50"
              classNamePrefix="select"
              onChange={(e) => handelChange(e)}
            />
            {getPages && (
              <Select
                // defaultValue={[colourOptions[2], colourOptions[3]]}
                name="colors"
                placeholder="Select Facebook Pages..."
                options={facebookPages}
                className="basic-multi-select w-50"
                classNamePrefix="select"
                onChange={(e) => getDetails(e)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="mt-3 mb-4 bg-chart">
            <h4 className="">Total Reach</h4>
            <p>The number of people who had any content from your Page or about your Page enter their screen. This includes posts, check-ins, ads, social information from people who interact with your Page and more. (Unique Users)</p>
            <Chart
              chartType="Bar"
              width="100%"
              height="300px"
              data={data}
              options={options}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
