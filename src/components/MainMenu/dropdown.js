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
        <div class="flex justify-center items-center">
          <span>{placeholder}</span>
          <ChevronDownIcon class="ml-2 inline h-4 w-4 text-gray-600" />
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
