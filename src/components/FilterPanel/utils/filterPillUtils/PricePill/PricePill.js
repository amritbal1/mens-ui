import React, { PureComponent } from "react";
import { contextConsumerSwitcher } from "../../../../../utils/contextUtils/index";
import { isEmpty } from "../../../../../utils/objectUtils";
import { MAX_PRICE_FILTER } from "../../../../../utils/enums";
import { getSlider } from "./StyledSlider";
import { ValueLabelComponent } from "./styles";

class PricePill extends PureComponent {
  handleSliderValueChange = (e, value, filterOptionClickFn) => {
    const [minPriceValue, maxPriceValue] = value;
    filterOptionClickFn({
      filterField: "filterMinPrice",
      optionId: minPriceValue,
    });
    filterOptionClickFn({
      filterField: "filterMaxPrice",
      optionId: maxPriceValue,
    });
  };

  handleClearButton = ({ filterOptionClickFn }) => {
    filterOptionClickFn({
      filterField: "filterMinPrice",
      optionId: null,
    });
    filterOptionClickFn({
      filterField: "filterMaxPrice",
      optionId: null,
    });
  };

  getValueText = (value) => {
    return `${value}`;
  };

  getPricePill = ({ context }) => {
    const { filterOptionClickFn, filterMinPrice, filterMaxPrice } = context;
    const minPrice = isEmpty(filterMinPrice) ? 0 : Number(filterMinPrice);
    const maxPrice = isEmpty(filterMaxPrice)
      ? MAX_PRICE_FILTER
      : Number(filterMaxPrice);
    return (
      <div class="mt-8 mr-4 px-4 pt-5 py-3 w-95vw">
        {getSlider({
          ref: null,
          ValueLabelComponent: ValueLabelComponent,
          value: [minPrice, maxPrice],
          onChangeCommittedFn: this.handleSliderValueChange,
          filterOptionClickFn,
          ariaLabelledBy: "range-slider",
          min: 0,
          max: 50,
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
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName: contextName,
      childFn: this.getPricePill,
    });
    return contextWrappedComponent;
  }
}

export default PricePill;
