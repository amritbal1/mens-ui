import React, { Component } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { checkIconStyle } from "./utils/filterPillUtils/checkboxStyling";
import { getValueFromUrl } from "../../utils/urlUtils/urlValueGetter";

const CHECKBOX_STYLE = `bg-white border border-gray-400 w-24px h-24px mr-2 flex-shrink-0 flex items-center justify-center`;

const HOVER_CHECKBOX_STYLE = `bg-white border border-gray-700 w-24px h-24px mr-2 flex-shrink-0 flex items-center justify-center`;

const SELECTED_CHECKBOX_STYLE = `bg-white w-24px h-24px mr-2 flex-shrink-0 flex items-center justify-center`;
class FilterOption extends Component {
  state = {
    checkboxStyle: CHECKBOX_STYLE,
  };

  handleClick = ({ isSelected }) => {
    const {
      filterField,
      id,
      allValuesField,
      isSingleSelect,
      filterOptionClickFn,
      urlParam,
    } = this.props;
    const newSelectionState = !isSelected;
    filterOptionClickFn({
      optionId: id,
      filterField,
      isSelected: newSelectionState,
      allValuesField,
      isSingleSelect,
      urlParam,
    });
  };

  handleOptionMouseEnter = () => {
    this.setState({ checkboxStyle: HOVER_CHECKBOX_STYLE });
  };

  handleOptionMouseLeave = () => {
    this.setState({ checkboxStyle: CHECKBOX_STYLE });
  };

  getFilterOption = () => {
    const { label, id, urlParam } = this.props;
    const { checkboxStyle } = this.state;
    const value = getValueFromUrl({ param: urlParam });
    const isSelected = Array.isArray(value) ? value.includes(id) : value === id;

    return (
      <div
        class="cursor-pointer py-1 sm:py-0"
        selected={isSelected}
        onMouseEnter={this.handleOptionMouseEnter}
        onMouseLeave={this.handleOptionMouseLeave}
      >
        <div class="flex justify-between w-min-165px">
          <div
            class="flex sm:py-2 w-full items-center"
            onClick={() => this.handleClick({ isSelected })}
          >
            <div class={isSelected ? SELECTED_CHECKBOX_STYLE : checkboxStyle}>
              {isSelected && <CheckIcon class={checkIconStyle} />}
            </div>
            <span class="text-sm sm:text-base font-light text-slate-gray">{label}</span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.getFilterOption();
  }
}

export default FilterOption;
