"use client";
import React from "react";

interface GradientSeparatorProps {
  height?: string;
  marginY?: string;
  width?: string;
  className?: string;
}

const Separator: React.FC<GradientSeparatorProps> = ({
  height = "h-[1px]",
  marginY = "my-4",
  width = "w-full",
  className = "",
}) => {
  return (
    <div
      className={`${height} ${marginY} ${width} ${className}`}
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #212B36",
      }}
    ></div>
  );
};

export default Separator;
