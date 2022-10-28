import React, { Component } from "react";
import * as skinTypeImage from "../../components/ProductFinder/config/images/skinTypes/oily.png";
import * as skinConcernImage from "../../components/ProductFinder/config/images/skinConcerns/aging.png";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "./dropdown";
import {
  ATTRIBUTES,
  SKIN_CONCERN_ATTRIBUTES,
  SKIN_TYPE_ATTRIBUTES,
} from "../ProductCard/attributes";
import ReviewSection from "./ReviewSection";

class SkinInfo extends Component {
  state = {
    selectedAttribute: "",
    selectedPositiveReviews: [],
    selectedNegativeReviews: [],
    selectedOverallScore: 0,
    dropdownOptions: [],
    analysisData: [],
  };

  componentDidMount() {
    const { analysisData, infoValue, queryTerm } = this.props;
    let amendedAnalysisData = analysisData;
    const amendedAttribute =
      infoValue === "skinConcern"
        ? SKIN_CONCERN_ATTRIBUTES[queryTerm]
        : SKIN_TYPE_ATTRIBUTES[queryTerm];

    if (
      infoValue === "skinConcern" &&
      analysisData.find((el) => el.attribute === "dry skin")
    ) {
      amendedAnalysisData = analysisData.map((data) => {
        return data.attribute === "dry skin"
          ? { ...data, attribute: "dryness" }
          : data;
      });
    }

    const selectedAttr = amendedAnalysisData.find(
      (el) => el.attribute === amendedAttribute
    );
    const { positiveReviews, negativeReviews, overallScore } = selectedAttr;

    const dropdownOptions = amendedAnalysisData.map((data) => {
      return {
        value: data[infoValue],
        label: `${ATTRIBUTES[data.attribute]}`,
      };
    });
    this.setState({
      analysisData: amendedAnalysisData,
      selectedAttribute: amendedAttribute,
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
    const { infoValue } = this.props;
    const { analysisData } = this.state;
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
    let scrollDiv = document.getElementById(`${infoValue}`);
    if (scrollDiv) scrollDiv.scrollTop = 0;
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
        <div class="rounded-t-lg bg-lilac-100 text-slate-gray py-2 sm:py-4 px-4">
          <div class="flex justify-between font-light uppercase tracking-wider mb-2 text-slate-teal">
            <div class="sm:mr-6 font-semibold">
              {infoValue === "skinType" ? "Skin Types" : "Skin Concerns"}
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
        <ReviewSection
          positiveReviews={selectedPositiveReviews}
          negativeReviews={selectedNegativeReviews}
          overallScore={selectedOverallScore}
          attribute={selectedAttribute}
          infoValue={infoValue}
        />
      </div>
    );
  }
}

export default SkinInfo;
