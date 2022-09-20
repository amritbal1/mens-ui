import React, { Component } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { isEmpty } from "../../utils/objectUtils";
import { ATTRIBUTES } from "../ProductCard/attributes";

class AttributeInfo extends Component {
  state = {
    readMoreSelectedPositive: false,
    readMoreSelectedNegative: false,
  };

  handleReadMoreClick = ({ reviewSection }) => {
    const { readMoreSelectedPositive, readMoreSelectedNegative } = this.state;
    reviewSection === "positive"
      ? this.setState({ readMoreSelectedPositive: !readMoreSelectedPositive })
      : this.setState({ readMoreSelectedNegative: !readMoreSelectedNegative });
  };

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
    const { readMoreSelectedNegative, readMoreSelectedPositive } = this.state;
    return (
      <div class="rounded-t-lg rounded-b-lg shadow-xl mb-8 sm:mr-4">
        <div class="rounded-t-lg bg-lilac-100 text-slate-gray pt-6 pb-4 px-4">
          <div class="flex flex-wrap justify-between items-center font-light uppercase tracking-wider mb-2 text-slate-teal">
            <div class="sm:mr-6 font-semibold">
              {ATTRIBUTES[attribute] || attribute}
            </div>
            <div class="normal-case text-slate-teal flex flex-shrink-0 items-center">
              <span class="mr-2 text-lg font-normal">{`${overallScore}% `}</span>
              <span class="text-xs">{"Analysis Score"}</span>
            </div>
          </div>
        </div>
        <div class="bg-white pb-6 px-4 pt-6 rounded-b-lg">
          {!isEmpty(positiveReviews) && (
            <div class="mb-8">
              <div class="font-light mb-4 font-light text-sm">
                Positive Reviews
              </div>
              {readMoreSelectedPositive ? (
                <div class="overflow-y-scroll h-60 sm:h-40">
                  {positiveReviews.map((review) => {
                    return (
                      <div class="mb-6 text-sm font-thin">
                        "{review.review_text}"
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div class="text-sm font-thin">
                  "{positiveReviews[0].review_text}"
                </div>
              )}
              {positiveReviews.length > 1 && (
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
          {!isEmpty(negativeReviews) && (
            <div class="mb-4">
              <div class="font-light mb-4 font-light text-sm">
                Negative Reviews
              </div>
              {readMoreSelectedNegative ? (
                <div class="overflow-y-scroll h-60 sm:h-40">
                  {negativeReviews.map((review) => {
                    return (
                      <div class="mb-6 text-sm font-thin">
                        "{review.review_text}"
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div class="text-sm font-thin">
                  "{negativeReviews[0].review_text}"
                </div>
              )}
              {negativeReviews.length > 1 && (
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
