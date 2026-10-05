// components/CustomSwitch.tsx
import React from "react";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        relative flex items-center h-5 w-9 rounded-full transition-colors duration-200 ease-in-out
        focus:outline-none cursor-pointer
        ${checked ? "bg-[#030213]" : "bg-[#CBCED4]"}
      `}
    >
      <span
        className={`
          inline-block  h-4 w-4 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out
          ${checked ? "translate-x-4" : "translate-x-1"}
        `}
      />
    </button>
  );
};

export default CustomSwitch;
