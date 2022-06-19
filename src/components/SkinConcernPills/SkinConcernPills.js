import React, { Component } from "react";

class SkinConcernPills extends Component {
  state = { popupValues: [] };

  handleOptionClick = ({ value }) => {
    const { popupValues } = this.state;
    const { handleClickFn } = this.props;
    //Remove value if already selected and remove response
    if (popupValues.includes(value)) {
      this.setState({
        popupValues: popupValues.filter((popupValue) => popupValue !== value),
      });
      handleClickFn({ optionValue: value, removeResponse: true });
    } else {
      this.setState({ popupValues: [...popupValues, value] });
    }
  };

  handleYesNoClick = ({ value, selectedResponse }) => {
    const { handleClickFn } = this.props;
    handleClickFn({ optionValue: value, selectedResponse });
  };
  render() {
    const { options, selectedOptions } = this.props;
    const { popupValues } = this.state;
    const optionsToDisplay = options.map((option, index) => {
      const { value, displayValue } = option;
      const isSelected =
        selectedOptions[value] === "Y" || selectedOptions[value] === "N";
      const style = `flex justify-center items-center border border-gray-300 rounded-full mt-4 mr-2 sm:mr-4 text-slate-gray hover:border-slate-gray cursor-pointer py-2 px-3 text-sm font-light ${
        isSelected ? "bg-gray-200" : ""
      }`;
      return (
        <div key={index}>
          <div
            key={index}
            value={value}
            onClick={() => this.handleOptionClick({ value })}
          >
            <div class={style}>{displayValue}</div>
          </div>
          {popupValues.includes(value) && (
            <div class="rounded-md shadow-lg w-40 text-sm mt-4 p-2 flex-shrink-0 text-sm font-light text-slate-gray">
              <div class="mb-2 text-center">Did the product work?</div>
              <div class="flex justify-center items-center border rounded-md flex-shrink-0">
                <div
                  class={`w-1/2 text-center cursor-pointer hover:bg-gray-200 py-2 border-r-2 ${
                    selectedOptions[value] === "Y" ? "bg-gray-200" : ""
                  }`}
                  onClick={() =>
                    this.handleYesNoClick({ value, selectedResponse: "Yes" })
                  }
                >
                  Yes
                </div>
                <div
                  class={`w-1/2 text-center cursor-pointer hover:bg-gray-200 py-2  ${
                    selectedOptions[value] === "N" ? "bg-gray-200" : ""
                  }`}
                  onClick={() =>
                    this.handleYesNoClick({ value, selectedResponse: "No" })
                  }
                >
                  No
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
    return <div class="flex flex-wrap">{optionsToDisplay}</div>;
  }
}

export default SkinConcernPills;
