import Select from "react-select";
import { CustomOption } from "./CustomOption";
import { getSelectStyles } from "./DropdownStyles";

export const Dropdown = ({
  options,
  handleChange,
  isDisabled,
  placeholder,
  value,
}) => {
  const commonProps = { options, isDisabled, placeholder };
  let valueObj = {};
  const valueIsValid =
    value === "" ||
    typeof value === "string" ||
    typeof value === "object";
  if (value === "" || typeof value === "string") {
    valueObj = { label: value, value };
  }
  if (typeof value === "object") {
    valueObj = value;
  }
  return valueIsValid ? (
    <Select
      {...commonProps}
      value={valueObj}
      onChange={handleChange}
      styles={getSelectStyles({})}
      components={{ Option: CustomOption }}
      noOptionsMessage={() => null}
    />
  ) : (
    <Select
      {...commonProps}
      onChange={handleChange}
      styles={getSelectStyles({})}
      components={{ Option: CustomOption }}
      noOptionsMessage={() => null}
    />
  );
};
