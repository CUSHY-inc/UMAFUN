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
  filter = false,
}: {
  options: string[];
  label?: string;
  selected: string | undefined;
  onChange: (event: DropdownChangeEvent) => void;
  className?: string;
  filter?: boolean;
}) => {
  return (
    <Dropdown
      options={options}
      onChange={onChange}
      value={selected}
      placeholder={label && label}
      className={twMerge("w-full text-sm", className)}
      filter={filter}
    />
  );
};

export type MultiSelectType = {
  value: string;
}[];
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
  selected: MultiSelectType | undefined;
  onChange: (event: MultiSelectChangeEvent) => void;
  display?: "comma" | "chip" | undefined;
  className?: string;
  style?: Object;
  flex?: boolean;
}) => {
  const customOptions: MultiSelectType = options?.map((option) => ({
    value: option,
  }));

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label">
        <PrimeReactMultiSelect
          value={selected}
          onChange={onChange}
          options={customOptions}
          optionLabel="value"
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
