"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Kanit } from "next/font/google";
import { Titillium_Web } from "next/font/google";
import { PT_Sans_Narrow } from "next/font/google";

const kanit = Kanit({ weight: "500", subsets: ["latin"] });
const tillium = PT_Sans_Narrow({ weight: "400", subsets: ["latin"] });

const Logo = () => {
  const { theme } = useTheme();
  const [loaderColor, setLoadercolor] = useState("light");
  useEffect(() => {
    if (theme == "light") setLoadercolor("#131118");
    else setLoadercolor("#f3f2f3");
  }, [theme]);
  return (
    <div className="flex items-center">
      {/* <div> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={42}
        height={44}
        viewBox="-5 -5 52 54"
      >
        {/* <g fill="#131118"> */}
        <g fill={loaderColor}>
          <motion.path
            animate={{ y: [3, 0] }}
            transition={{ times: [0, 1], duration: 1 }}
            id="topleft"
            d="M0 0.897461V16.6105L9.39604 9.38692L0 0.897461Z"
          />
          <motion.path
            animate={{ y: [-3, 0] }}
            transition={{ times: [0, 1], duration: 1 }}
            id="bottomleft"
            d="M0 43.1383L9.39604 34.6508L0 27.4326V43.1383Z"
          />
          <motion.path
            animate={{ y: [0, -3, 0], x: [0, 5, 0] }}
            transition={{ times: [0, 1], duration: 1 }}
            id="topright"
            d="M17.6191 19.8654L41.2598 0.897461H27.4806L0 22.0226L17.6191 19.8654Z"
          />
          <motion.path
            animate={{ y: [0, 3, 0], x: [0, 5, 0] }}
            transition={{ times: [0, 1], duration: 1 }}
            id="bottomright"
            d="M0 22.0225L27.4806 43.1394H41.2598L17.6191 24.1678L0 22.0225Z"
          />
        </g>
      </svg>
      {/* </div> */}
      <span className={tillium.className}>
        {" "}
        <span className="text-3xl font-semibold"> Kit </span>
      </span>
    </div>
  );
};

export default Logo;
