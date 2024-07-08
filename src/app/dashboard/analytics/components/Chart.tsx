"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import chartOptions from "./chartoptions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const App = () => {
  const [category, setCategory] = useState(0);
  const [index, setIndex] = useState(0);

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

  const handleChart = () => {
    setChartData({
      ...chartData,
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: chartOptions[category].data[index].data.categories,
        },
      },
      series: [
        {
          ...chartData.series[0],
          data: chartOptions[category].data[index].data.values,
        },
      ],
    });

    // console.log(chartData);
  };

  useEffect(() => {
    // handleChart();
  }, [category]);
  useEffect(() => {
    // handleChart();
  }, [index]);

  return (
    <>
      {/* <button onClick={handleClick}>click</button> */}
      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {chartOptions[category].name}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {chartOptions.map((option, index) => {
              return (
                <DropdownMenuItem
                  onClick={() => {
                    setCategory(index);
                  }}
                >
                  {option.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center">
          <Button variant="ghost" className="p-2">
            +
          </Button>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>{index}</DropdownMenuTrigger>
              {/* {chartOptions[category].data[index].name} */}
              <DropdownMenuContent>
                {chartOptions[category].data.map((option, index) => {
                  return (
                    <DropdownMenuItem
                      onClick={() => {
                        setIndex(index);
                      }}
                    >
                      {option.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" className="p-2">
            -
          </Button>
        </div>
      </div>
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
