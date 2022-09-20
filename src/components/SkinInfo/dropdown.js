import Select from "react-select";
import { CustomOption } from "../shared/Dropdown/CustomOption";
import { getSelectStyles } from "../shared/Dropdown/DropdownStyles";

export const Dropdown = ({
  options,
  handleChange,
  isDisabled = false,
  placeholder,
  value,
}) => {
  const commonProps = { options, isDisabled, placeholder };
  return (
    <Select
      {...commonProps}
      value={{ label: value, value }}
      onChange={handleChange}
      styles={getSelectStyles({})}
      components={{ Option: CustomOption }}
      noOptionsMessage={() => null}
    />
  );
};
