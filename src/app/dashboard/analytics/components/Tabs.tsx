"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

interface TabsProps {
  title: string;
  value: number;
  progressPercentage?: number;
  progressType?: "less" | "more";
}

const Tabs: React.FC<TabsProps> = ({
  title,
  value,
  progressPercentage,
  progressType,
}) => {
  return (
    <div className="p-3 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <p className="text-muted-foreground text-xs md:text-xs">{title}</p>
        <p className="text-muted-foreground">$</p>
      </div>

      <div className="flex justify-between mt-1 md:mt-3">
        <p className="font-extrabold relative text-xl md:text-2xl">
          {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        {progressPercentage && (
          <p className="mt-1 md:mt-2">
            <span
              className={cn(
                progressType == "more"
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600",
                "py-[1px] px-1 text-[0.6rem] md:text-xs  rounded-lg"
              )}
            >
              {progressType == "more" ? "+" : "-"} {progressPercentage} %
            </span>{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
