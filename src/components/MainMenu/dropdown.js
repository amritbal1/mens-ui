import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { CustomOption } from "../shared/Dropdown/CustomOption";
import { getSelectStyles } from "../shared/Dropdown/DropdownStyles";

export const Dropdown = ({
  options,
  handleChange,
  isDisabled = false,
  placeholder,
  value,
  inputValueObject = false,
  overrideStyles = {},
}) => {
  const commonProps = { options, isDisabled };

  return (
    <Select
      {...commonProps}
      placeholder={
        <div class="flex justify-center items-center text-slate-gray">
          <span class="text-xs">{placeholder}</span>
          <ChevronDownIcon class="ml-2 inline h-3 w-3 text-slate-gray" />
        </div>
      }
      value={inputValueObject ? inputValueObject : { label: value, value }}
      onChange={handleChange}
      styles={getSelectStyles({ overrideStyles })}
      components={{ Option: CustomOption }}
      noOptionsMessage={() => null}
      inputProps={{ readOnly: true }}
      isSearchable={false}
    />
  );
};
