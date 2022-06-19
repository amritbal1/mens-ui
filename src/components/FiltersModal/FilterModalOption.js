import React, { Component } from "react";
import { FILTER_PILL_NAME } from "../../utils/enums";
import { CheckIcon } from "@heroicons/react/outline";
import ResultsContext from "../../pages/ResultsPage/ResultsContext";
import RatingPill from "../FilterPanel/utils/filterPillUtils/RatingPillCreator/RatingPill";
import PricePill from "../FilterPanel/utils/filterPillUtils/PricePill/PricePill";
import { contextConsumerSwitcher } from "../../utils/contextUtils";
import ChoiceOption from "./ChoiceOption";
import {
  checkIconStyle,
  getCheckboxStyle,
} from "../FilterPanel/utils/filterPillUtils/checkboxStyling";

class FilterModalOption extends Component {
  handleClick = ({ value, isSelected, filterOptionClickFn }) => {
    const { filterField, allValuesField, isSingleSelect } = this.props;
    const newSelectionState = !isSelected;
    filterOptionClickFn({
      optionId: value,
      filterField,
      isSelected: newSelectionState,
      allValuesField,
      isSingleSelect,
    });
  };

  getFilterModalOption = ({ context }) => {
    const { label, data, filterField, contextName, isChoicePill } = this.props;
    const { filterOptionClickFn } = context;
    let options;

    if (label === FILTER_PILL_NAME.RATING) {
      options = <RatingPill contextName={contextName} />;
    } else if (label === FILTER_PILL_NAME.PRICE) {
      options = <PricePill contextName={contextName} />;
    } else if (isChoicePill) {
      return (
        <ChoiceOption
          label={label}
          filterField={filterField}
          contextName={contextName}
        />
      );
    } else {
      options =
        data &&
        data.map(({ value, displayValue }) => {
          const isSelected = Array.isArray(context[filterField])
            ? context[filterField].includes(value)
            : context[filterField] === value;
          return (
            <div
              class="py-1 flex items-center justify-between"
              onClick={() =>
                this.handleClick({ value, isSelected, filterOptionClickFn })
              }
            >
              <span class="font-light text-slate-gray">{displayValue}</span>
              <div class={getCheckboxStyle({ isSelected })}>
                {isSelected && <CheckIcon class={checkIconStyle} />}
              </div>
            </div>
          );
        });
    }

    return (
      <div class="py-4 border-b">
        <div class="uppercase font-normal text-slate-gray pb-2">{label}</div>
        <div>{options}</div>
      </div>
    );
  };

  render() {
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName: contextName,
      childFn: this.getFilterModalOption,
    });
    return <div>{contextWrappedComponent}</div>;
  }
}

FilterModalOption.contextType = ResultsContext;

export default FilterModalOption;
