import React, { Component } from "react";
import { CheckIcon } from "@heroicons/react/outline";
import { contextConsumerSwitcher } from "../../utils/contextUtils/index";
import { checkIconStyle, getCheckboxStyle } from "../FilterPanel/utils/filterPillUtils/checkboxStyling";

class ChoiceOption extends Component {
  state = {
    isSelected: false,
  };

  handlePillClick = ({ filterOptionClickFn }) => {
    const { isSelected } = this.state;
    const { filterField } = this.props;
    filterOptionClickFn({ filterField: filterField, optionId: !isSelected });
    this.setState({ isSelected: !isSelected });
  };

  getChoicePill = ({ context }) => {
    const { filterOptionClickFn } = context;
    const { label } = this.props;
    const { isSelected } = this.state;
    return (
      <div>
        <div
          class="py-2 flex items-center justify-between"
          onClick={() => this.handlePillClick({ filterOptionClickFn })}
        >
          <span class="uppercase font-normal text-slate-gray pb-2">{label}</span>
          <div class={getCheckboxStyle({ isSelected })}>
            {isSelected && <CheckIcon class={checkIconStyle} />}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName: contextName,
      childFn: this.getChoicePill,
    });
    return contextWrappedComponent;
  }
}

export default ChoiceOption;
