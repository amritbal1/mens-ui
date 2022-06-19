import React, { PureComponent } from "react";
import InformationTabs from "./InformationTabs";
import RatingStar from "../Rating/Rating";

class ProductInfo extends PureComponent {
  render() {
    const { productDetails } = this.props;
    const {
      brandName,
      productName,
      overallMetrics,
      productDescription,
      ingredients,
    } = productDetails;
    const { numberOfReviews, starRating } = overallMetrics;
    const numOfRatingsText = `(${numberOfReviews} review${
      numberOfReviews > 1 ? "s" : ""
    })`;
    return (
      <div class="h-full w-full flex flex-col sm:justify-between">
        <div class="flex justify-between mb-6 mr-2 sm:mr-0">
          <div class="px-6 sm:px-0">
            <div class="text-base font-light text-slate-gray mb-1">
              {brandName}
            </div>
          </div>
          <div class="flex items-start">
            <div class="mr-2 flex-shrink-0">
              <RatingStar value={starRating} />
            </div>
            <span class="text-sm font-light text-gray-500 flex-shrink-0">
              {numOfRatingsText}
            </span>
          </div>
        </div>
        <div>
          <div class="uppercase tracking-widest text-base text-slate-gray px-6 sm:px-0 mb-8">
            {productName}
          </div>
        </div>
        <div class="px-6 sm:px-0">
          <InformationTabs
            productDescription={productDescription}
            ingredients={ingredients}
          />
        </div>
        {/* <div class="mb-4 sm:mr-4">
          <BuyPanel affiliateData={affiliateData} />
        </div> */}
      </div>
    );
  }
}

export default ProductInfo;
