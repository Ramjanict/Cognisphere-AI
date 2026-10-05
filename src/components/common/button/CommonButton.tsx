import clsx from "clsx";
import React, { type ReactNode } from "react";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "danger" | "small";
  size?: "xs" | "sm" | "md" | "lg";
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyles =
    "rounded-lg font-bold transition-colors duration-200 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed leading-[20px] cursor-pointer text-sm";

  const variantStyles: Record<typeof variant, string> = {
    primary: "bg-[#22C55E] text-white   ",
    secondary: "bg-black text-white border border-[#454F5B]   ",
    small: "bg-[#ECEEF2] text-[#030213]  ",
    outline: "bg-black text-white border border-[#212B36] ",
    danger: "bg-[#FF4842] text-white ",
  };

  const sizeStyles: Record<typeof size, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
        "cursor-pointer"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
