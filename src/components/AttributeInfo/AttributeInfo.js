import React, { Component } from "react";
import { ATTRIBUTES } from "../ProductCard/attributes";
import { getReviewSection } from "../SkinInfo/reviewSection";
class AttributeInfo extends Component {

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

  getAnalysisComponent = ({
    attribute,
    overallScore,
    positiveReviews,
    negativeReviews,
  }) => {
    return (
      <div class="rounded-t-lg rounded-b-lg shadow-xl mb-8 sm:mr-4">
        <div class="rounded-t-lg bg-lilac-100 text-slate-gray pt-6 pb-4 px-4">
          <div class="flex flex-wrap justify-between items-center font-light uppercase tracking-wider text-slate-teal">
            <div class="sm:mr-6 font-semibold">
              {ATTRIBUTES[attribute] || attribute}
            </div>
            <div class="normal-case text-slate-teal flex flex-shrink-0 items-center">
              <span class="mr-2 text-lg font-normal">{`${overallScore}% `}</span>
              <span class="text-xs">{"Analysis Score"}</span>
            </div>
          </div>
        </div>
        {getReviewSection({ positiveReviews, negativeReviews })}
      </div>
    );
  };

  render() {
    const { analysisData } = this.props;
    const { attribute, overallScore, positiveReviews, negativeReviews } =
      analysisData;
    return positiveReviews.length > 0 || negativeReviews.length > 0
      ? this.getAnalysisComponent({
          attribute,
          overallScore,
          positiveReviews,
          negativeReviews,
        })
      : null;
  }
}

export default AttributeInfo;
