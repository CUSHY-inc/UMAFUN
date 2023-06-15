import { twMerge } from "tailwind-merge";
import { MultiSelect as PrimeReactMultiSelect } from "primereact/multiselect";
import React from "react";
import { Dropdown } from "primereact/dropdown";

export const Select = ({
  options,
  label,
  selected,
  setSelected,
  className,
  filter = false,
}: {
  options: string[];
  label?: string;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  className?: string;
  filter?: boolean;
}) => {
  return (
    <Dropdown
      options={options}
      onChange={(e) => setSelected(e.value)}
      value={selected}
      placeholder={label && label}
      className={twMerge("w-full text-sm", className)}
      filter={filter}
    />
  );
};

export type MultiSelectType = {
  name: string;
}[];
export const MultiSelect = ({
  options,
  label,
  selected,
  setSelected,
  display = "comma",
  className,
  style,
  flex = false,
}: {
  options: string[];
  label: string;
  selected: MultiSelectType | null;
  setSelected: React.Dispatch<React.SetStateAction<MultiSelectType | null>>;
  display?: "comma" | "chip" | undefined;
  className?: string;
  style?: Object;
  flex?: boolean;
}) => {
  const customOptions: MultiSelectType = options?.map((option) => ({
    name: option,
  }));

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label">
        <PrimeReactMultiSelect
          value={selected}
          onChange={(e) => setSelected(e.value)}
          onFocus={(e) => console.log(e)}
          onBlur={(e) => console.log(e)}
          options={customOptions}
          optionLabel="name"
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
