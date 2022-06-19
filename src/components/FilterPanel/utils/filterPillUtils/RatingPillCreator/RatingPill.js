import React, { PureComponent } from "react";
import { contextConsumerSwitcher } from "../../../../../utils/contextUtils/index";
import { getSlider } from "../PricePill/StyledSlider";
import { ValueLabelComponent } from "./styles";

class RatingPill extends PureComponent {
  handleSliderValueChange = (e, value, filterOptionClickFn) => {
    filterOptionClickFn({
      filterField: "filterStarRating",
      optionId: value,
    });
  };

  handleClearButton = ({ filterOptionClickFn }) => {
    filterOptionClickFn({
      filterField: "filterStarRating",
      optionId: null,
    });
  };

  getRatingPill = ({ context }) => {
    const { filterOptionClickFn, filterStarRating } = context;
    const { ref } = this.props;
    return (
      <div  class="mt-8 px-4 pt-5 py-3 w-95vw" key="rating-1">
        {getSlider({
          ref: ref,
          value: filterStarRating,
          ValueLabelComponent: ValueLabelComponent,
          onChangeCommittedFn: this.handleSliderValueChange,
          filterOptionClickFn,
          ariaLabelledBy: "discrete-slider",
          step: 1,
          defaultValue: 0,
          marks: true,
          min: 0,
          max: 5,
        })}
        <div class="flex justify-end py-2">
          <div>
            <button
              class="px-3 py-1 text-lilac-700 md:hover:bg-lilac-50 rounded-md"
              onClick={() =>
                this.handleClearButton({
                  filterOptionClickFn,
                })
              }
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName: contextName,
      childFn: this.getRatingPill,
    });
    return contextWrappedComponent;
  }
}

export default RatingPill;
