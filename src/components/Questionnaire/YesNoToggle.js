import React, { PureComponent } from "react";
import { isEmpty } from "../../utils/objectUtils";

class YesNoToggle extends PureComponent {
  handleOptionClick = ({ value, selectedResponse }) => {
    const { handleClickFn } = this.props;
    handleClickFn({
      optionValue: value,
      selectedResponse,
    });
  };
  render() {
    const { option, selectedOptions } = this.props;
    const { displayValue, value } = option;
    return (
      <div class="flex justify-between sm:w-350px">
        {!isEmpty(displayValue) && (
          <div class="mr-3 sm:mr-10 flex items-center text-slate-gray text-sm font-light">
            {displayValue}
          </div>
        )}
        <div class="flex items-center">
          <div class="rounded-md w-40 text-sm flex-shrink-0">
            <div class="flex justify-center items-center border rounded-md flex-shrink-0">
              <div
                class={`w-1/2 text-center cursor-pointer hover:bg-gray-200 py-1 border-r-2 text-slate-gray text-sm font-light ${
                  selectedOptions[value] === "Y" ? "bg-gray-200" : ""
                }`}
                onClick={() =>
                  this.handleOptionClick({ value, selectedResponse: "Yes" })
                }
              >
                Yes
              </div>
              <div
                class={`w-1/2 text-center cursor-pointer hover:bg-gray-200 py-1 text-slate-gray text-sm font-light ${
                  selectedOptions[value] === "N" ? "bg-gray-200" : ""
                }`}
                onClick={() =>
                  this.handleOptionClick({ value, selectedResponse: "No" })
                }
              >
                No
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YesNoToggle;
