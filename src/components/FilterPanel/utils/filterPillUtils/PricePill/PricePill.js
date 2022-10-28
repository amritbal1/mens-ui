import React, { PureComponent } from "react";
import { MAX_PRICE_FILTER } from "../../../../../utils/enums";
import { getSlider } from "./StyledSlider";

class PricePill extends PureComponent {
  state = {
    sliderValues: [0, MAX_PRICE_FILTER],
  };

  handleSliderChange = (e, value) => {
    this.setState({ sliderValues: value });
  };

  handleSliderValueChange = (e, value, filterOptionClickFn) => {
    const [minPriceValue, maxPriceValue] = value;
    filterOptionClickFn({
      filterField: "filterMinPrice",
      optionId: minPriceValue,
      urlParam: "minPrice",
    });
    filterOptionClickFn({
      filterField: "filterMaxPrice",
      optionId: maxPriceValue,
      urlParam: "maxPrice",
    });
  };

  handleClearButton = ({ filterOptionClickFn }) => {
    filterOptionClickFn({
      filterField: "filterMinPrice",
      urlParam: "minPrice",
      optionId: null,
    });
    filterOptionClickFn({
      filterField: "filterMaxPrice",
      urlParam: "maxPrice",
      optionId: null,
    });
  };

  getValueText = (value) => {
    return `${value}`;
  };

  getPricePill = ({ sliderValues }) => {
    const { filterOptionClickFn } = this.props;
    return (
      <div class="mt-10 px-3 pt-5 py-3 w-95vw">
        {getSlider({
          ref: null,
          value: sliderValues,
          onChangeCommittedFn: this.handleSliderValueChange,
          filterOptionClickFn,
          ariaLabelledBy: "range-slider",
          min: 0,
          max: MAX_PRICE_FILTER,
          steps: false,
          onChangeFn: this.handleSliderChange,
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
    const { sliderValues } = this.state;
    return this.getPricePill({ sliderValues });
  }
}

export default PricePill;
