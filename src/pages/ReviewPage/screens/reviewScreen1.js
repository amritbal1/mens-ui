import React, { Component } from "react";
import ProductSelector from "../../../components/ProductSelector/ProductSelector";
import { Questionnaire } from "../../../components/Questionnaire/Questionnaire";
import { ReviewFormTitle } from "../../../components/ReviewFormTitle/ReviewFormTitle";
import SpeedOfResults from "../../../components/SpeedOfResults/SpeedOfResults";
import StarRating from "../../../components/StarRating/StarRating";
import { isEmpty } from "../../../utils/objectUtils";
import { getButtonStyle } from "../../../utils/styles";
import { wouldRepurchaseOptions } from "../utils/options";
import { productCharacteristics as productCharacteristicsOptions } from "../../../utils/config";

class ReviewScreen1 extends Component {
  render() {
    const {
      selectedBrand,
      selectedProduct,
      speedOfResults,
      starRating,
      wouldRepurchaseValue,
      brandSelectorHandler,
      productSelectorHandler,
      starRatingHandler,
      handleWouldRepurchase,
      speedOfResultsValueHandler,
      speedOfResultsUnitsHandler,
      handleScreenButtonClick,
      productCharacteristics,
      handleProductCharacteristics,
    } = this.props;
    const { value, unit } = speedOfResults;
    const isNextButtonDisabled =
      isEmpty(selectedBrand) ||
      isEmpty(selectedProduct) ||
      isEmpty(starRating) ||
      isEmpty(wouldRepurchaseValue) ||
      isEmpty(productCharacteristics);
    return (
      <div class="flex flex-col items-center">
        <div class="sm:space-y-8 px-2">
          <div class="flex-col sm:flex sm:flex-row">
            <div class="sm:mr-12 sm:w-1/2 mb-4 sm:mb-0">
              <ReviewFormTitle title="Select the product being reviewed" />
              <ProductSelector
                selectedBrand={selectedBrand}
                selectedProduct={selectedProduct}
                brandSelectorHandler={brandSelectorHandler}
                productSelectorHandler={productSelectorHandler}
              />
            </div>
            <div class="sm:w-1/2">
              <div class="mb-4">
                <div class="mr-4 flex items-center sm:items-start">
                  <ReviewFormTitle title="Rating" />
                </div>
                <StarRating
                  rating={starRating}
                  starRatingHandler={starRatingHandler}
                />
              </div>
              <div class="flex flex-col mb-4 sm:mb-0">
                <ReviewFormTitle
                  title="Would you buy this product again?"
                  styles={"mb-1"}
                />
                <Questionnaire
                  options={wouldRepurchaseOptions}
                  key={value}
                  handleClickFn={handleWouldRepurchase}
                  selectedOptions={{
                    wouldRepurchaseValue:
                      wouldRepurchaseValue === ""
                        ? null
                        : wouldRepurchaseValue
                        ? "Y"
                        : "N",
                  }}
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col mb-4 sm:mb-0">
            <ReviewFormTitle
              title="Time taken to see results"
              isRequired={false}
              styles={"mb-1"}
            />
            <div>
              <SpeedOfResults
                speedOfResultsValue={value}
                speedOfResultsUnit={unit}
                speedOfResultsValueHandler={speedOfResultsValueHandler}
                speedOfResultsUnitsHandler={speedOfResultsUnitsHandler}
              />
            </div>
          </div>
          <div class="mb-4 sm:mb-0">
            <div class="sm:mb-6">
              <ReviewFormTitle
                title="Please answer a few questions about the product:"
                styles={"mb-2"}
              />
              <Questionnaire
                options={productCharacteristicsOptions}
                handleClickFn={handleProductCharacteristics}
                selectedOptions={productCharacteristics}
              />
            </div>
          </div>
          <div class="flex justify-end">
            <button
              class={getButtonStyle({ disabled: isNextButtonDisabled })}
              onClick={() =>
                handleScreenButtonClick({ screenNumberToRender: 2 })
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewScreen1;
