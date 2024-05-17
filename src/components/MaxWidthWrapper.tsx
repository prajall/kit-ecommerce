import { cn } from "@/lib/utils";
import React from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-widthwrapper w-full px-2.5 sm:px-4 mx-auto max-w-screen-xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
