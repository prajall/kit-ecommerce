"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const App = () => {
  const [chartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: [
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
      },

      colors: ["#000"],
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 120, 130],
      },
    ],
  });

  return (
    <div className="app w-full sm:w-1/2">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
