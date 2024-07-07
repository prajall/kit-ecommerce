"use client";
import { Button } from "@/components/ui/button";
import "react-circular-progressbar/dist/styles.css";

import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const easeInQuad = (t: number) => t * t;

// const easeInQuad = (t: number) => t * t;
// const easeInQuad = (t) => {
//   return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
// };
const CircularProgressBar = ({ number }: { number: number }) => {
  const [number1, setNumber1] = useState(0);

  const animateNumbers = (
    target1: number,
    interval: number,
    duration: number
  ) => {
    if (target1 > 100) {
      target1 = 100;
    }
    if (target1 < 0) {
      target1 = 0;
    }
    setNumber1(0);
    const steps = duration / interval;
    let currentStep = 0;

    const intervalId = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / steps;
      const easedProgress = easeInQuad(progress);

      setNumber1(easedProgress * target1);

      if (currentStep >= steps) {
        clearInterval(intervalId);
        setNumber1(target1);
      }
    }, interval);
  };

  useEffect(() => {
    animateNumbers(number, 10, 1000);
  }, []);

  return (
    <div className="w-40">
      <CircularProgressbar
        value={number1}
        // text={`${Math.ceil(number1).toString()}%`}
        text={`${number}%`}
        styles={buildStyles({
          strokeLinecap: "round",
          pathColor: `#000`,
          textColor: "#000",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
      {/* <Button
        onClick={() => {
          animateNumbers(90, 10, 1000);
        }}
      >
        Reset
      </Button> */}
    </div>
  );
};

export default CircularProgressBar;
