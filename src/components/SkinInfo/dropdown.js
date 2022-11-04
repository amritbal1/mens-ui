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
  const commonProps = { options, isDisabled, placeholder };
  return (
    <Select
      {...commonProps}
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
