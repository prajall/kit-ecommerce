"use client";
//@ts-nocheck

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const loader = () => {
  const { theme } = useTheme();
  const [loaderColor, setLoadercolor] = useState("light");
  useEffect(() => {
    if (theme == "light") setLoadercolor("#131118");
    else setLoadercolor("#f3f2f3");
  }, [theme]);
  return (
    <div className="w-full h-full mx-auto flex items-center justify-center  -z-20 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={42}
        height={44}
        viewBox="-5 -5 52 54"
      >
        <g fill={loaderColor}>
          <motion.path
            animate={{ y: [3, 0, 3] }}
            transition={{ repeat: Infinity, times: [0, 1], duration: 1 }}
            id="topleft"
            d="M0 0.897461V16.6105L9.39604 9.38692L0 0.897461Z"
          />
          <motion.path
            animate={{ y: [-3, 0, -3] }}
            transition={{ repeat: Infinity, times: [0, 1], duration: 1 }}
            id="bottomleft"
            d="M0 43.1383L9.39604 34.6508L0 27.4326V43.1383Z"
          />
          <motion.path
            animate={{ y: [0, -3, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, times: [0, 1], duration: 1 }}
            id="topright"
            d="M17.6191 19.8654L41.2598 0.897461H27.4806L0 22.0226L17.6191 19.8654Z"
          />
          <motion.path
            animate={{ y: [0, 3, 0], x: [0, 5, 0] }}
            transition={{ repeat: Infinity, times: [0, 1], duration: 1 }}
            id="bottomright"
            d="M0 22.0225L27.4806 43.1394H41.2598L17.6191 24.1678L0 22.0225Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default loader;
