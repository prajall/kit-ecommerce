import React from "react";
import Loader from "@/components/Loader";
const Loading = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Loader />
    </div>
  );
};

export default Loading;
