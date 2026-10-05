"use client";
import { IoAlertCircleSharp } from "react-icons/io5";

type AlertBoxProps = {
  title: string;
  padding?: string;
  className?: string;
  background?: string;
};

const AlertBox = ({
  title,
  padding = "p-3",
  className = "",
  background = "linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%),#212B36",
}: AlertBoxProps) => {
  return (
    <div
      style={{ background }}
      className={`${padding} rounded-[8px] flex items-center gap-3 ${className}`}
    >
      <IoAlertCircleSharp size={24} />
      <p className="text-xs leading-[18px] text-white">{title}</p>
    </div>
  );
};

export default AlertBox;
