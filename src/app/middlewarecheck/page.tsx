"use client";
import { isAdmin } from "@/lib/authMiddleware";
import React, { useEffect } from "react";

const Middleware = () => {
  useEffect(() => {
    console.log("run");
    isAdmin();
  }, []);
  return <div>Middleware</div>;
};

export default Middleware;
