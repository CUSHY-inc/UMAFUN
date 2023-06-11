import { twMerge } from "tailwind-merge";
import Select, { ActionMeta, MultiValue } from "react-select";
import Multiselect from "multiselect-react-dropdown";
import { Select as MaterialSelect, Option } from "@material-tailwind/react";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";

type OptionType = {
  label: string;
  value: string;
};
export const ReactSelect = ({
  options,
  defaultNum,
  placeholder,
  isMulti,
  className,
  onChange,
}: {
  options: string[];
  defaultNum?: number;
  placeholder?: string;
  isMulti?: boolean;
  label?: string;
  className?: string;
  onChange?: (
    selectedOption: OptionType | MultiValue<OptionType> | null,
    actionMeta: ActionMeta<OptionType>
  ) => void;
}) => {
  const customOptios = options?.map((value) => ({ value, label: value }));
  return (
    customOptios && (
      <Select
        className={twMerge("text-lg", className)}
        options={customOptios}
        defaultValue={
          defaultNum !== undefined ? customOptios[defaultNum] : null
        }
        placeholder={placeholder && placeholder}
        isMulti={isMulti && isMulti}
        onChange={onChange}
      />
    )
  );
};

export const MultiselectDropdown = ({
  options,
  placeholder,
  className,
  onSelect,
  onRemove,
}: {
  options: string[];
  placeholder?: string;
  className?: string;
  onSelect?: (selectedList: OptionType[], selectedItem: OptionType) => void;
  onRemove?: (selectedList: OptionType[], removedItem: OptionType) => void;
}) => {
  const customOptions = options?.map((value, index) => ({
    name: value,
    id: String(index),
  }));

  return (
    customOptions && (
      <Multiselect
        className={twMerge("", className)}
        options={customOptions}
        placeholder={placeholder && placeholder}
        displayValue="name"
        onSelect={onSelect}
        onRemove={onRemove}
      />
    )
  );
};

export const MaterialTailwindSelect = ({
  options,
  label,
  className,
}: {
  options: string[];
  label?: string;
  className?: string;
}) => {
  return (
    options && (
      <MaterialSelect className={twMerge("text-lg", className)} label={label}>
        {options.map((option) => (
          <Option>{option}</Option>
        ))}
      </MaterialSelect>
    )
  );
};

export const PrimereactMultiselect = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Los Angeles", code: "LA" },
    { name: "Chicago", code: "CH" },
  ];
  return (
    <MultiSelect
      value={selectedCities}
      onChange={(e) => setSelectedCities(e.value)}
      options={cities}
      optionLabel="name"
      placeholder="Select Cities"
      maxSelectedLabels={3}
      className="w-full md:w-20rem"
    />
  );
};
