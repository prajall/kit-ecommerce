"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import chartOptions from "./chartoptions";

const App = () => {
  const [chartData, setChartData] = useState({
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
        name: "Sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 120, 130, 126],
      },
    ],
  });

  const handleClick = () => {
    setChartData({
      ...chartData,
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: chartOptions[1].data[0].data.categories,
        },
      },
      series: [
        {
          ...chartData.series[0],
          data: chartOptions[1].data[0].data.values,
        },
      ],
    });

    console.log(chartData);
  };

  return (
    <>
      <button onClick={handleClick}>click</button>
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
    </>
  );
};

export default App;
