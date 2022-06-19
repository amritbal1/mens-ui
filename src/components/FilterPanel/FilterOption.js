import React, { Component } from "react";
import { contextConsumerSwitcher } from "../../utils/contextUtils/index";
import { CheckIcon } from "@heroicons/react/outline";
import {
  checkIconStyle,
  getCheckboxStyle,
} from "./utils/filterPillUtils/checkboxStyling";

class FilterOption extends Component {
  state = { showOnlyButton: false, hoverOnlyButton: false };

  handleClick = ({ context, isSelected }) => {
    const { filterOptionClickFn } = context;
    const { filterField, id, allValuesField, isSingleSelect } = this.props;
    const newSelectionState = !isSelected;
    filterOptionClickFn({
      optionId: id,
      filterField,
      isSelected: newSelectionState,
      allValuesField,
      isSingleSelect,
    });
  };

  handleOnlyButtonClick = ({ context }) => {
    const { filterOptionClickFn } = context;
    const { filterField, id, allValuesField } = this.props;
    filterOptionClickFn({
      optionId: id,
      filterField,
      isSelected: true,
      allValuesField,
      isOnlyOption: true,
    });
  };

  handleOptionMouseEnter = () => {
    this.setState({ showOnlyButton: true });
  };

  handleOptionMouseLeave = () => {
    this.setState({ showOnlyButton: false });
  };

  handleOnlyButtonMouseEnter = () => {
    this.setState({ hoverOnlyButton: true });
  };

  handleOnlyButtonMouseLeave = () => {
    this.setState({ hoverOnlyButton: false });
  };

  getFilterOption = ({ context }) => {
    const { label, filterField, id } = this.props;
    const { showOnlyButton, hoverOnlyButton } = this.state;
    const isSelected = Array.isArray(context[filterField])
      ? context[filterField].includes(id)
      : context[filterField] === id;
    const onlyButtonDisplayStyle = showOnlyButton ? "" : "hidden";
    const onlyButtonHoverStyle = hoverOnlyButton
      ? "bg-lilac-50 text-lilac-700"
      : "text-lilac-500";
    const onlyButtonStyle = `${onlyButtonHoverStyle} ${onlyButtonDisplayStyle} rounded-md px-2 py-1 my-auto text-xs`;
    return (
      <div
        class="cursor-pointer px-1 py-1 sm:px-2 sm:py-0"
        selected={isSelected}
        onMouseEnter={this.handleOptionMouseEnter}
        onMouseLeave={this.handleOptionMouseLeave}
      >
        <div class="flex justify-between w-min-165px">
          <div
            class="flex py-1 w-full"
            onClick={() => this.handleClick({ context, isSelected })}
          >
            <div class={getCheckboxStyle({ isSelected })}>
              {isSelected && <CheckIcon class={checkIconStyle} />}
            </div>
            <span class="text-sm font-light text-slate-gray">{label}</span>
          </div>
          <span
            class={onlyButtonStyle}
            onMouseEnter={this.handleOnlyButtonMouseEnter}
            onMouseLeave={this.handleOnlyButtonMouseLeave}
            onClick={() => this.handleOnlyButtonClick({ context })}
          >
            Only
          </span>
        </div>
      </div>
    );
  };

  render() {
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName: contextName,
      childFn: this.getFilterOption,
    });
    return contextWrappedComponent;
  }
}

export default FilterOption;
