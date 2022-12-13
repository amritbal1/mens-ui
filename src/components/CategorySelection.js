import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { CURRENCIES } from "../utils/currencyEnum";
import { isEmpty } from "../utils/objectUtils";

class CategorySelection extends Component {
  handleCategoryClick = ({ key, value }) => {
    const { history } = this.props;
    //Push to new URL
    if (key === "product") {
      history.push(`/product?productId=${value}`);
    } else {
      history.push(
        `/results?brands=null&minPrice=null&maxPrice=null&${
          key !== "productCategories"
            ? "productCategories=null"
            : `${key}=${value}`
        }&${key !== "skinConcerns" ? "skinConcerns=null" : `${key}=${value}`}`
      );
    }
  };

  render() {
    const { config = [], type, pricingData = [] } = this.props;
    const localCurrency =
      !isEmpty(pricingData) &&
      !isEmpty(pricingData[0]) &&
      !isEmpty(pricingData[0].country) &&
      CURRENCIES[pricingData[0].country];
    return (
      <div
        class={`overflow-y-scroll scrollbar w-full flex justify-start ${
          type === "productCategories" ? "lg:justify-center" : ""
        }`}
      >
        {config.map((category, index) => {
          const { key, value, name, imageUrl } = category;
          return (
            <div
              class={`px-4 md:px-10 pb-2 cursor-pointer md:hover:opacity-60 flex flex-col items-center flex-shrink-0`}
            >
              <img
                src={imageUrl}
                alt="skin"
                class={`h-130px w-130px sm:h-150px sm:w-150px md:h-180px md:w-180px lg:h-200px lg:w-200px cursor-pointer ${
                  type === "product" ? "" : "rounded-full"
                } ${type === "productCategories" ? "p-2 bg-darkStone" : "p-2"}`}
                onClick={() => this.handleCategoryClick({ key, value })}
              />
              <div
                class={`pt-3 justify-self-end text-center uppercase text-xs ${
                  type === "product"
                    ? "w-max-250px sm:text-xs lg:text-sm"
                    : "sm:text-xs lg:text-sm"
                }`}
              >
                {name}
              </div>
              {!isEmpty(pricingData) &&
                pricingData.length === config.length &&
                pricingData[index].price && (
                  <div
                    class={`pt-3 justify-self-end text-center uppercase text-sm`}
                  >
                    {localCurrency}
                    {(Math.round(pricingData[index].price * 100) / 100).toFixed(
                      2
                    )}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(CategorySelection);
