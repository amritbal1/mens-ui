import React, { Component } from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/solid";
import {
  getMultipleAffiliateOptions,
  getSingleAffiliateOption,
} from "./utils/affiliateOptionUtil";

class BuyPanel extends Component {
  state = {
    displayChevron: true,
    selectedPricingOptionName: null,
    productUrl: null,
  };

  componentDidMount() {
    const { affiliateData } = this.props;
    const option = affiliateData[0];
    const { productUrl, name } = option;
    if (affiliateData.length === 1) {
      this.setState({ productUrl });
    } else {
      //if there are more than 1 affiliate options, set the first one as the default
      this.setState({
        selectedPricingOptionName: name,
        productUrl,
      });
    }
  }
  handleMouseEnter = (e) => {
    this.setState({ displayChevron: false });
  };
  handleMouseLeave = (e) => {
    this.setState({ displayChevron: true });
  };

  handlePricingOptionClick = (name, productUrl) => {
    this.setState({ selectedPricingOptionName: name, productUrl });
  };

  getAffiliateOptions = ({ affiliateData }) => {
    const { selectedPricingOptionName } = this.state;

    return affiliateData.length === 1
      ? getSingleAffiliateOption({ affiliateOption: affiliateData[0] })
      : getMultipleAffiliateOptions({
          affiliateData,
          selectedPricingOptionName,
          handlePricingOptionClickFn: this.handlePricingOptionClick,
        });
  };
  render() {
    const { displayChevron, productUrl } = this.state;
    const { affiliateData } = this.props;
    const formattedAffiliateOptions = this.getAffiliateOptions({
      affiliateData,
    });
    return (
      <div>
        {formattedAffiliateOptions}
        <a href={productUrl} target="_blank" rel="noopener noreferrer">
          <button
            class="flex-shrink-0 bg-lilac-300 text-white text-base font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-gradient focus:ring-offset-4 focus:ring-offset-lilac-200 md:hover:bg-lilac-400"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <div class="flex justify-center items-center text-lg">
              Shop Now
              {displayChevron ? (
                <ChevronRightIcon class="h-5 w-5 ml-4" />
              ) : (
                <ArrowRightIcon class="h-4 w-4 ml-4" />
              )}
            </div>
          </button>
        </a>
      </div>
    );
  }
}

export default BuyPanel;
