import React, { Component } from "react";
import * as skinTypeImage from "../../components/ProductFinder/config/images/skinTypes/oily.png";
import * as skinConcernImage from "../../components/ProductFinder/config/images/skinConcerns/aging.png";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "./dropdown";
import { ATTRIBUTES } from "../ProductCard/attributes";
import { getReviewSection } from "./reviewSection";

class SkinInfo extends Component {
  state = {
    selectedAttribute: "",
    selectedPositiveReviews: [],
    selectedNegativeReviews: [],
    selectedOverallScore: 0,
    dropdownOptions: [],
  };

  componentDidMount() {
    const { analysisData, infoValue } = this.props;
    const { attribute, positiveReviews, negativeReviews, overallScore } =
      analysisData[0];

    const dropdownOptions = analysisData.map((data) => {
      return {
        value: data[infoValue],
        label: `${ATTRIBUTES[data.attribute]}`,
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
    this.setScrollToTop();
  };

  setScrollToTop = () => {
    const { infoValue } = this.props;
    let positiveDiv = document.getElementById(`${infoValue}-positive`);
    let negativeDiv = document.getElementById(`${infoValue}-negative`);
    if (positiveDiv) positiveDiv.scrollTop = 0;
    if (negativeDiv) negativeDiv.scrollTop = 0;
  };

  render() {
    const {
      selectedAttribute,
      selectedOverallScore,
      selectedPositiveReviews,
      selectedNegativeReviews,
      dropdownOptions,
    } = this.state;
    const { infoValue } = this.props;
    return (
      <div class="rounded-t-lg rounded-b-lg shadow-xl mb-8 sm:mr-4">
        <div class="rounded-t-lg bg-lilac-100 text-slate-gray pt-6 pb-4 px-4">
          <div class="flex justify-between font-light uppercase tracking-wider mb-2 text-slate-teal">
            <div class="sm:mr-6 font-semibold">
              {infoValue === "skinType" ? "Skin Type" : "Skin Concern"}
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
              <div class="w-min-185px mb-3">
                <Dropdown
                  options={dropdownOptions}
                  handleChange={this.handleDropdownChange}
                  placeholder={ATTRIBUTES[selectedAttribute]}
                  value={ATTRIBUTES[selectedAttribute]}
                />
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
        {getReviewSection({
          overallScore: selectedOverallScore,
          positiveReviews: selectedPositiveReviews,
          negativeReviews: selectedNegativeReviews,
          attribute: selectedAttribute
        })}
      </div>
    );
  }
}

export default SkinInfo;
