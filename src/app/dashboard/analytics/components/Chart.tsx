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
import { ArrowDown, ChevronDown } from "lucide-react";

const App = () => {
  const [category, setCategory] = useState(0);
  const [index, setIndex] = useState(chartOptions[category].data.length - 1);

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: chartOptions[category].data[index].data.categories,
      },

      colors: ["#000"],
    },
    series: [
      {
        name: "Sales",
        data: chartOptions[category].data[index].data.values,
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

    console.log(chartData);
  };

  const handleCategory = (categoryIndex: number) => {
    const maxIndex = chartOptions[categoryIndex].data.length - 1;
    setIndex(maxIndex);
    setCategory(categoryIndex);
    handleChart();
  };
  const handleIndex = (indexIndex: number) => {
    setIndex(indexIndex);
    handleChart();
  };

  useEffect(() => {
    handleChart();
  }, [category, index]);

  return (
    <>
      {/* <button onClick={handleClick}>click</button> */}
      <div className="app w-full sm:w-1/2">
        <div className="flex gap-3 justify-end ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex py-1 px-3 items-center gap-1 border bg-gray-100 bg-opacity-60 rounded-full">
                {chartOptions[category].name}
                <ChevronDown size={13} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {chartOptions.map((option, index) => {
                return (
                  <DropdownMenuItem
                    onClick={() => {
                      handleCategory(index);
                    }}
                  >
                    {option.name}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center">
            {/* <Button variant="ghost" className="p-2">
            +
          </Button> */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex py-1 px-3 items-center gap-1 border bg-gray-100 bg-opacity-60 rounded-full">
                    {/* {index} */}
                    {chartOptions[category].data[index].name}
                    <ChevronDown size={13} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {chartOptions[category].data.map((option, index) => {
                    return (
                      <DropdownMenuItem
                        onClick={() => {
                          handleIndex(index);
                        }}
                      >
                        {option.name}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* <Button variant="ghost" className="p-2">
            -
          </Button> */}
          </div>
        </div>

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
