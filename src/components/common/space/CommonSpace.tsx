import React, { type ReactNode } from "react";

interface CommonSpace {
  children: ReactNode;
  className?: string;
}

const CommonSpace: React.FC<CommonSpace> = ({ children, className }) => {
  return <div className={`py-6 ${className}`}>{children}</div>;
};

export default CommonSpace;
