"use client";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

interface CloseButtonProps {
  close?: () => void;
  size?: number | string;
  color?: string;
  className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  close,
  size = 16,
  color = "text-primary",
  className = "",
}) => {
  return (
    <span
      onClick={close}
      className={`cursor-pointer ${color} text-[${size}px] ${className}  `}
    >
      <MdOutlineClose className="inline-block" size={size} />
    </span>
  );
};

export default CloseButton;
