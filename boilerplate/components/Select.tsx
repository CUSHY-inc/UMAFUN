import { twMerge } from "tailwind-merge";
// import Select, { ActionMeta, MultiValue } from "react-select";
import { Select as MaterialSelect, Option } from "@material-tailwind/react";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";

// type OptionType = {
//   label: string;
//   value: string;
// };
// export const ReactSelect = ({
//   options,
//   defaultNum,
//   placeholder,
//   isMulti,
//   className,
//   onChange,
// }: {
//   options: string[];
//   defaultNum?: number;
//   placeholder?: string;
//   isMulti?: boolean;
//   label?: string;
//   className?: string;
//   onChange?: (
//     selectedOption: OptionType | MultiValue<OptionType> | null,
//     actionMeta: ActionMeta<OptionType>
//   ) => void;
// }) => {
//   const customOptios = options?.map((value) => ({ value, label: value }));
//   return (
//     customOptios && (
//       <Select
//         className={twMerge("text-lg", className)}
//         options={customOptios}
//         defaultValue={
//           defaultNum !== undefined ? customOptios[defaultNum] : null
//         }
//         placeholder={placeholder && placeholder}
//         isMulti={isMulti && isMulti}
//         onChange={onChange}
//       />
//     )
//   );
// };

export const Select = ({
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

export type MultiSelectType = {
  value: string;
};
export const Multiselect = ({
  options,
  label,
}: {
  options: string[];
  label: string;
}) => {
  const [selected, setSelected] = useState<MultiSelectType | null>(null);
  const customOptions: MultiSelectType[] = options?.map((option) => ({
    value: option,
  }));

  return (
    <div className="card flex justify-content-center">
      <span className="p-float-label">
        <MultiSelect
          value={selected}
          onChange={(e) => setSelected(e.value)}
          options={customOptions}
          optionLabel="value"
          className="w-full md:w-20rem"
        />
        <label>{label}</label>
      </span>
    </div>
  );
};
