import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface SpinnerProps {
  className: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={cn({
        "rounded-full border-4 border-primary border-t-transparent animate-spin":
          true,
        [`${className}`]: className,
      })}
    />
  );
};

export default Spinner;
