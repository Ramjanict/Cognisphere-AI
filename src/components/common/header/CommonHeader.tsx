import clsx from "clsx";
import React, { type ReactNode } from "react";

interface CommonHeaderProps extends React.ButtonHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;

  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "gray";
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  children,
  className = "",
  size = "md",
  ...props
}) => {
  const baseStyles = " text-start text-white";

  const sizeStyles: Record<typeof size, string> = {
    xs: "text-xs leading-[16px] text-[#717182]",
    sm: "text-sm leading-[22px] text-[#C4CDD5]",
    gray: "text-sm leading-[22px] !text-[#919EAB]",
    md: "text-base leading-[24px]  ",
    lg: "text-lg leading-[28px] ",
    xl: "text-xl leading-[30px]  font-medium",
    "2xl": "text-[32px] leading-[48px] font-bold ",
    "3xl": "text-[48px] leading-[64px] font-bold ",
  };

  return (
    <h2 className={clsx(baseStyles, sizeStyles[size], className)} {...props}>
      {children}
    </h2>
  );
};

export default CommonHeader;
