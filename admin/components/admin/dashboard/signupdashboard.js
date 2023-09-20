import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: [
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
  ],
  previousDate: {
    label: "1",
    dataSet: [10, 20, 30, 40],
  },
  currentDate: {
    label: "2",
    dataSet: [20, 30, 40, 50],
  },
  currentDate2: {
    label: "3",
    dataSet: [30, 40, 50, 60],
  },
  currentDate3: {
    label: "4",
    dataSet: [40, 50, 60, 70],
  },
  currentDate4: {
    label: "5",
    dataSet: [50, 60, 70, 80],
  },
};

function Signupdashboard() {
  return (
    <div>
      <Bar
        // pointStyle="star"
        data={{
          labels: data.labels,
          responsive: true,
          offset: true,
          datasets: [
            {
              label: "Students",
              pointStyle: "rectRounded",
              backgroundColor: "red",
              barThickness: 40,
              categoryPercentage: 1,
              data: data.previousDate.dataSet, //From API
            },
            {
              label: "College",
              pointStyle: "rectRounded",
              backgroundColor: "orange",
              barThickness: 40,
              categoryPercentage: 1,
              data: data.currentDate.dataSet, //From API
            },
            {
              label: "Campus Amb",
              pointStyle: "rectRounded",
              backgroundColor: "green",
              barThickness: 40,
              categoryPercentage: 1,
              data: data.currentDate2.dataSet, //From API
            },
            {
              label: "Working Prof",
              pointStyle: "rectRounded",
              backgroundColor: "black",
              barThickness: 40,
              categoryPercentage: 1,
              data: data.currentDate3.dataSet, //From API
            },
            {
              label: "School",
              backgroundColor: "#1497FF",
              barThickness: 40,
              categoryPercentage: 1,
              pointStyle: "triangle",
              data: data.currentDate4.dataSet, //From API
            },
          ],
        }}
        height={220}
        options={{
          offsetGridLines: true,
          drawTicks: true,
          layout: {
            padding: {
              top: 30,
              right: 40,
              bottom: 40,
            },
          },
          legend: {
            display: true,
            position: "right",
            align: "start",
            labels: {
              usePointStyle: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  padding: 5,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                stacked: false,
                gridLines: {
                  drawBorder: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default Signupdashboard;
