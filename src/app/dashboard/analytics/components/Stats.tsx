import React from "react";
import Tabs from "./Tabs";

const Stats = () => {
  return (
    <div className=" grid gap-2 grid-cols-2 lg:grid-cols-4">
      <Tabs
        title="Total Revenue"
        value={120000}
        progressPercentage={15.29}
        progressType="more"
      />
      <Tabs
        title="Orders"
        value={3490}
        progressPercentage={2.61}
        progressType="less"
      />
      <Tabs title="Total Customers" value={18913} />
      <Tabs title="Total Revenue" value={120000} />
    </div>
  );
};

export default Stats;
