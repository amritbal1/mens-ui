import React, { Component } from "react";
import * as skinTypeImage from "../../components/ProductFinder/config/images/skinTypes/oily.png";
import * as skinConcernImage from "../../components/ProductFinder/config/images/skinConcerns/aging.png";
import {
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { isEmpty } from "../../utils/objectUtils";
import { Dropdown } from "./dropdown";

class SkinInfo extends Component {
  state = {
    selectedAttribute: "",
    selectedPositiveReviews: [],
    selectedNegativeReviews: [],
    selectedOverallScore: 0,
    dropdownOptions: [],
    readMoreSelectedPositive: false,
    readMoreSelectedNegative: false,
  };

  handleReadMoreClick = ({ reviewSection }) => {
    const { readMoreSelectedPositive, readMoreSelectedNegative } = this.state;
    reviewSection === "positive"
      ? this.setState({ readMoreSelectedPositive: !readMoreSelectedPositive })
      : this.setState({ readMoreSelectedNegative: !readMoreSelectedNegative });
  };

  componentDidMount() {
    const { analysisData, infoValue } = this.props;
    const { attribute, positiveReviews, negativeReviews, overallScore } =
      analysisData[0];
    const dropdownOptions = analysisData.map((data) => {
      return {
        value: data[infoValue],
        label: `${data[infoValue]} ${infoValue === "skinType" ? "skin" : ""}`,
      };
    });
    this.setState({
      selectedAttribute: attribute,
      selectedPositiveReviews: positiveReviews,
      selectedNegativeReviews: negativeReviews,
      selectedOverallScore: overallScore,
      dropdownOptions: dropdownOptions,
    });
  }
  getMatchDescriptor = ({ overallScore }) => {
    switch (true) {
      case overallScore <= 50:
        return "Poor";
      case overallScore <= 60:
        return "Average";
      case overallScore <= 70:
        return "Good";
      case overallScore <= 80:
        return "Very Good";
      case overallScore <= 100:
        return "Excellent";
      default:
        return "OK";
    }
  };

  handleDropdownChange = (selectedOption) => {
    const { value } = selectedOption;
    const { analysisData, infoValue } = this.props;
    const selectedData = analysisData.find((el) => el[infoValue] === value);

    const { attribute, positiveReviews, negativeReviews, overallScore } =
      selectedData;
    this.setState({
      selectedAttribute: attribute,
      selectedPositiveReviews: positiveReviews,
      selectedNegativeReviews: negativeReviews,
      selectedOverallScore: overallScore,
    });
  };

  render() {
    const {
      selectedAttribute,
      selectedOverallScore,
      selectedPositiveReviews,
      selectedNegativeReviews,
      dropdownOptions,
      readMoreSelectedPositive,
      readMoreSelectedNegative,
    } = this.state;
    const { infoValue } = this.props;
    return (
      <div class="rounded-t-lg rounded-b-lg shadow-xl mb-8 sm:mr-4">
        <div class="rounded-t-lg bg-lilac-100 text-slate-gray pt-6 pb-4 px-4">
          <div class="flex justify-between font-light uppercase tracking-wider mb-2 text-slate-teal">
            <div class="sm:mr-6 font-semibold">
              {infoValue === "skinType" ? "Skin Type" : "Skin Concern"}
            </div>
            <div class="w-min-165px">
              <Dropdown
                options={dropdownOptions}
                handleChange={this.handleDropdownChange}
                placeholder={selectedAttribute}
                value={selectedAttribute}
              />
            </div>
          </div>
          <div class="flex uppercase">
            <img
              src={
                infoValue === "skinType"
                  ? skinTypeImage.default
                  : skinConcernImage.default
              }
              alt="icon"
              class="ml-4 h-16 w-16 bg-white rounded-full p-1"
            />
            <div class="ml-8">
              <div class="normal-case text-slate-teal flex flex-shrink-0 items-center">
                <span class="mr-2 text-lg font-normal">{`${selectedOverallScore}% `}</span>
                <span class="text-xs">{"Analysis Score"}</span>
              </div>
              <div class="flex items-center flex-shrink-0 mt-1 text-slate-teal">
                <span class="mr-1">
                  {selectedOverallScore >= 60 ? (
                    <CheckIcon class="h-5 w-5 text-green-800" />
                  ) : (
                    <XMarkIcon class="h-5 w-5 text-red-800" />
                  )}
                </span>
                <div class="text-base text-slate-teal">
                  {`${this.getMatchDescriptor({
                    overallScore: selectedOverallScore,
                  })} match`}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white pb-6 px-4 pt-6 rounded-b-lg">
          {!isEmpty(selectedPositiveReviews) && (
            <div class="mb-8">
              <div class="font-light mb-4 font-light text-sm">
                Positive Reviews
              </div>
              {readMoreSelectedPositive ? (
                <div class="overflow-y-scroll h-60 sm:h-40">
                  {selectedPositiveReviews.map((review) => {
                    return (
                      <div class="mb-6 text-sm font-thin">
                        "{review.review_text}"
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div class="text-sm font-thin">
                  "{selectedPositiveReviews[0].review_text}"
                </div>
              )}
              {selectedPositiveReviews.length > 1 && (
                <div class="text-right">
                  <span
                    class="text-gray-400 text-sm font-light"
                    onClick={() =>
                      this.handleReadMoreClick({ reviewSection: "positive" })
                    }
                  >
                    <span class="text-xs text-lilac-700">
                      {readMoreSelectedPositive ? "Read Less" : "Read More"}
                    </span>
                    {readMoreSelectedPositive ? (
                      <ChevronUpIcon class="ml-1 h-4 w-4 inline text-lilac-700" />
                    ) : (
                      <ChevronDownIcon class="ml-1 h-4 w-4 inline text-lilac-700" />
                    )}
                  </span>
                </div>
              )}
            </div>
          )}
          {!isEmpty(selectedNegativeReviews) && (
            <div class="mb-4">
              <div class="font-light mb-4 font-light text-sm">
                Negative Reviews
              </div>
              {readMoreSelectedNegative ? (
                <div class="overflow-y-scroll h-60 sm:h-40">
                  {selectedNegativeReviews.map((review) => {
                    return (
                      <div class="mb-6 text-sm font-thin">
                        "{review.review_text}"
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div class="text-sm font-thin">
                  "{selectedNegativeReviews[0].review_text}"
                </div>
              )}
              {selectedNegativeReviews.length > 1 && (
                <div class="text-right">
                  <span
                    class="text-gray-400 text-sm font-light"
                    onClick={() =>
                      this.handleReadMoreClick({ reviewSection: "negative" })
                    }
                  >
                    <span class="text-xs text-lilac-700">
                      {readMoreSelectedNegative ? "Read Less" : "Read More"}
                    </span>
                    {readMoreSelectedNegative ? (
                      <ChevronUpIcon class="ml-1 h-4 w-4 inline text-lilac-700" />
                    ) : (
                      <ChevronDownIcon class="ml-1 h-4 w-4 inline text-lilac-700" />
                    )}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SkinInfo;
