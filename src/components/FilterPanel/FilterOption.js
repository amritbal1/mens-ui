import React, { Component } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  checkIconStyle,
  getCheckboxStyle,
} from "./utils/filterPillUtils/checkboxStyling";
import { getValueFromUrl } from "../../utils/urlUtils/urlValueGetter";

class FilterOption extends Component {
  // state = { showOnlyButton: false, hoverOnlyButton: false };

  handleClick = ({isSelected }) => {
    const { filterField, id, allValuesField, isSingleSelect, filterOptionClickFn, urlParam } = this.props;
    const newSelectionState = !isSelected;
    filterOptionClickFn({
      optionId: id,
      filterField,
      isSelected: newSelectionState,
      allValuesField,
      isSingleSelect,
      urlParam
    });
  };

  // handleOnlyButtonClick = () => {
  //   const { filterField, id, allValuesField, filterOptionClickFn, urlParam } = this.props;
  //   filterOptionClickFn({
  //     optionId: id,
  //     filterField,
  //     isSelected: true,
  //     allValuesField,
  //     isOnlyOption: true,
  //     urlParam
  //   });
  // };

  // handleOptionMouseEnter = () => {
  //   this.setState({ showOnlyButton: true });
  // };

  // handleOptionMouseLeave = () => {
  //   this.setState({ showOnlyButton: false });
  // };

  // handleOnlyButtonMouseEnter = () => {
  //   this.setState({ hoverOnlyButton: true });
  // };

  // handleOnlyButtonMouseLeave = () => {
  //   this.setState({ hoverOnlyButton: false });
  // };

  getFilterOption = () => {
    const { label, id, urlParam } = this.props;
    // const { showOnlyButton, hoverOnlyButton } = this.state;
    const value = getValueFromUrl({ param: urlParam });
    const isSelected = Array.isArray(value) ? value.includes(id) : value === id;
    // const onlyButtonDisplayStyle = showOnlyButton ? "" : "hidden";
    // const onlyButtonHoverStyle = hoverOnlyButton
    //   ? "bg-lilac-50 text-lilac-700"
    //   : "text-lilac-500";
    // const onlyButtonStyle = `${onlyButtonHoverStyle} ${onlyButtonDisplayStyle} rounded-md px-2 py-1 my-auto text-xs`;
    return (
      <div
        class="cursor-pointer px-1 py-1 sm:px-2 sm:py-0"
        selected={isSelected}
        onMouseEnter={this.handleOptionMouseEnter}
        onMouseLeave={this.handleOptionMouseLeave}
      >
        <div class="flex justify-between w-min-165px">
          <div
            class="flex py-1 w-full items-center"
            onClick={() => this.handleClick({ isSelected })}
          >
            <div class={getCheckboxStyle()}>
              {isSelected && <CheckIcon class={checkIconStyle} />}
            </div>
            <span class="text-sm font-light text-slate-gray">{label}</span>
          </div>
          {/* <span
            class={onlyButtonStyle}
            onMouseEnter={this.handleOnlyButtonMouseEnter}
            onMouseLeave={this.handleOnlyButtonMouseLeave}
            onClick={() => this.handleOnlyButtonClick()}
          >
            Only
          </span> */}
        </div>
      </div>
    );
  };

  render() {
    return this.getFilterOption();
  }
}

export default FilterOption;
