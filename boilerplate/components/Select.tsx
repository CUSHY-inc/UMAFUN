import { twMerge } from "tailwind-merge";
import {
  MultiSelectChangeEvent,
  MultiSelect as PrimeReactMultiSelect,
} from "primereact/multiselect";
import React from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

export const Select = ({
  options,
  label,
  selected,
  onChange,
  className,
  style,
  filter = false,
}: {
  options: string[];
  label?: string;
  selected: string | undefined;
  onChange: (event: DropdownChangeEvent) => void;
  className?: string;
  style?: React.CSSProperties | undefined;
  filter?: boolean;
}) => {
  return (
    <Dropdown
      options={options}
      onChange={onChange}
      value={selected}
      placeholder={label && label}
      className={twMerge("w-full text-sm", className)}
      style={style}
      filter={filter}
    />
  );
};

export const MultiSelect = ({
  options,
  label,
  selected,
  onChange,
  display = "comma",
  className,
  style,
  flex = false,
}: {
  options: string[];
  label: string;
  selected: string[] | undefined;
  onChange: (event: MultiSelectChangeEvent) => void;
  display?: "comma" | "chip" | undefined;
  className?: string;
  style?: Object;
  flex?: boolean;
}) => {
  // const customOptions: string[] = options?.map((option) => ({
  //   value: option,
  // }));

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label">
        <PrimeReactMultiSelect
          value={selected}
          onChange={onChange}
          options={options}
          optionLabel=""
          className={twMerge("w-full text-sm", className)}
          style={style}
          display={display}
          flex={flex}
        />
        <label>{label}</label>
      </span>
    </div>
  );
};
