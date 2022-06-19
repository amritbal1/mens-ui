import React, { Component } from "react";
import { Dropdown } from "../shared/Dropdown/Dropdown";
import { UNIT_DROPDOWN_OPTIONS } from "./constants";

class SpeedOfResults extends Component {
  handleDropdownChange = (selectedOption) => {
    const { speedOfResultsUnitsHandler } = this.props;
    const { value } = selectedOption;
    speedOfResultsUnitsHandler({ unit: value });
  };

  handleNumberInputChange = (event) => {
    const value = event.target.value;
    const { speedOfResultsValueHandler } = this.props;
    speedOfResultsValueHandler({ value });
  };

  render() {
    const { speedOfResultsValue, speedOfResultsUnit } = this.props;
    return (
      <div class="flex">
        <input
          value={speedOfResultsValue}
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="1"
          min="0"
          class="shadow font-light text-sm appearance-none border rounded w-16 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
          onChange={this.handleNumberInputChange}
        />
        <div class="w-min-185px">
          <Dropdown
            value={speedOfResultsUnit}
            options={UNIT_DROPDOWN_OPTIONS}
            handleChange={this.handleDropdownChange}
            placeholder={"Days/Weeks/Months"}
          />
        </div>
      </div>
    );
  }
}

export default SpeedOfResults;
