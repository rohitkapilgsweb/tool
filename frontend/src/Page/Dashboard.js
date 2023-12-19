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

export const data = [
  [
    "Day",
    "Guardians of the Galaxy",
    "The Avengers",
    "Transformers: Age of Extinction",
  ],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11, 5.3, 7.9, 4.7],
  [12, 6.6, 8.4, 5.2],
  [13, 4.8, 6.3, 3.6],
  [14, 4.2, 6.2, 3.4],
];

export const options = {
  title: "Company Performance",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

function Dashboard() {
  const [getFacebookAccounts, setGetFacebookAccounts] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_Facebook_Data()).then((res) => {
      setGetFacebookAccounts(res?.payload?.data);
    });

    checkTrialStatus();
    const data = localStorage.getItem("trialData");
    if (!data) {
      createTrialLink(3);
      function createTrialLink(durationDays) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + durationDays);

        const trialData = {
          expirationDate: expirationDate.toISOString(),
        };

        // Store trial data in localStorage (for demonstration purposes)
        localStorage.setItem("trialData", JSON.stringify(trialData));
      }
    }
  }, []);

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

  // Example: Check trial status and get remaining days
  // const trialStatus = checkTrialStatus();

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
    // console.log(e?.value)
    dispatch(get_Facebook_Pages(e?.value));
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
    };
    return AllValues;
  };
  console.log(DateTimeExclude("2023-12-18T08:00:00+0000"), "DateTimeExclude");

  return (
    <div className="container-fluid pt-4">
      {isLoading && <Loader />}
      <div className="row">
        {/* <div className="col-lg-4 col-md-6  d-flex align-items-strech">
            <div>
  
            <CountdownCircleTimer
          isPlaying
          duration={checkTrialStatus().remainingDays * 86400}
          // duration={2000}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
              {checkTrialStatus().isActive ? <h1 className="text-success">Active trial with {checkTrialStatus().remainingDays} { checkTrialStatus().remainingDays === 1 ? "day":"days"} remaining</h1> :
               <h1 className="text-danger">Active trial is ended</h1>
              }
              
            </div>
        </div> */}
        <div className="col-lg-4 col-md-6  d-flex align-items-strech">
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
        <div className="col-lg-4 col-md-6  d-flex align-items-strech">
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
        <div className="col-lg-4 col-md-6  d-flex align-items-strech">
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
            <h4>{jsonData?.data[0].title}</h4>
            <p>{jsonData?.data[0].description}</p>
            <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={data}
              // options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
