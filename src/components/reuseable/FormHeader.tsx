import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import CommonHeader from "../common/header/CommonHeader";

interface SectionHeaderProps {
  title?: string;
  className?: string;
  handleClose: () => void;
}

const FormHeader: React.FC<SectionHeaderProps> = ({
  title,
  className = "",
  handleClose,
}) => {
  return (
    <div className={`w-full flex items-center justify-between  ${className}`}>
      <CommonHeader size="xl">{title}</CommonHeader>
      <span onClick={handleClose} className="text-white cursor-pointer">
        <IoCloseCircleOutline size={24} />
      </span>
    </div>
  );
};

export default FormHeader;
