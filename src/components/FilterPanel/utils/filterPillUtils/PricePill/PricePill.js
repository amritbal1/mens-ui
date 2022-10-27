import React, { PureComponent } from "react";
import { isEmpty } from "../../../../../utils/objectUtils";
import { MAX_PRICE_FILTER } from "../../../../../utils/enums";
import { getSlider } from "./StyledSlider";

class PricePill extends PureComponent {
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

  getPricePill = () => {
    const { filterOptionClickFn, filterMinPrice, filterMaxPrice } = this.props;
    const minPrice = isEmpty(filterMinPrice) ? 0 : Number(filterMinPrice);
    const maxPrice = isEmpty(filterMaxPrice)
      ? MAX_PRICE_FILTER
      : Number(filterMaxPrice);
    return (
      <div class="mt-10 px-3 pt-5 py-3 w-95vw">
        {getSlider({
          ref: null,
          value: [minPrice, maxPrice],
          onChangeCommittedFn: this.handleSliderValueChange,
          filterOptionClickFn,
          ariaLabelledBy: "range-slider",
          min: 0,
          max: MAX_PRICE_FILTER,
          steps: false,
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
    return this.getPricePill();
  }
}

export default PricePill;
