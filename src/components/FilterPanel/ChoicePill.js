import React, { Component } from "react";
import { PhotographIcon } from "@heroicons/react/outline";
import { contextConsumerSwitcher } from "../../utils/contextUtils/index";

class ChoicePill extends Component {
  state = {
    isPillClicked: false,
  };

  handlePillClick = ({ filterOptionClickFn }) => {
    const { isPillClicked } = this.state;
    const { filterField } = this.props;
    filterOptionClickFn({ filterField: filterField, optionId: !isPillClicked });
    this.setState({ isPillClicked: !isPillClicked });
  };

  getChoicePill = ({ context }) => {
    const { filterOptionClickFn } = context;
    const { label } = this.props;
    const { isPillClicked } = this.state;
    const pillClickedStyling = isPillClicked
      ? "bg-gray-100 border-gray-700"
      : "bg-white md:hover:border-gray-700";
    const pillStyling = `font-light rounded-full border px-4 py-2 cursor-pointer flex ${pillClickedStyling}`;
    return (
      <div>
        <div
          class={pillStyling}
          onClick={() => this.handlePillClick({ filterOptionClickFn })}
        >
          <PhotographIcon class="h-4 w-4 my-auto mr-2" />
          <span class="text-xs">{label}</span>
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

export default ChoicePill;
