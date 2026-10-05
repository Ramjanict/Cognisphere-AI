import clsx from "clsx";
import React, { type ReactNode } from "react";

interface CommonButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  shadow?: boolean;
}

const CommonBorder: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  size = "md",
  shadow = false,
  ...props
}) => {
  const baseStyles = " bg-black border-[#212B36] border";
  const shadowStyles = "shadow-[0_6px_30px_0_rgba(0,0,0,0.25)]";
  const sizeStyles: Record<typeof size, string> = {
    xs: "p-2 rounded-[8px]  ",
    sm: "p-4 rounded-[8px] ",
    md: "p-6  rounded-[16px] border ",
    lg: "p-8 rounded-2xl ",
  };

  return (
    <div
      className={clsx(
        baseStyles,
        shadow && shadowStyles,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CommonBorder;
