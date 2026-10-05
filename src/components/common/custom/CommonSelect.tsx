"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // update path if needed
import React from "react";

// generic SelectOption interface
interface SelectOption<T extends string> {
  label: string;
  value: T;
}

interface SelectProps<T extends string> {
  value: T;
  item: readonly SelectOption<T>[];
  w?: number;
  onValueChange: (val: T) => void;
  className?: string;
  icon?: React.ReactNode; // optional icon
}

const CommonSelect = <T extends string>({
  value,
  item,
  w = 200,
  onValueChange,
  className,
  icon,
}: SelectProps<T>) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        style={{ minWidth: w }}
        className={`flex items-center gap-2 ${
          icon ? "pl-2" : ""
        } ${className} bg-white border border-border px-3 !py-1 cursor-pointer rounded-md outline-none text-sm focus:ring-0 focus:border-none focus:ring-offset-0 transition-all duration-200`}
      >
        {icon && <span className="text-2xl text-[#717182]">{icon}</span>}
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>

      <SelectContent className="bg-white border  rounded-md shadow-md outline-none">
        {item.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors rounded"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CommonSelect;
