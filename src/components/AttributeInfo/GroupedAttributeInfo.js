import React, { Component } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { isEmpty } from "../../utils/objectUtils";
import { ATTRIBUTES } from "../ProductCard/attributes";

class GroupedAttributeInfo extends Component {
  state = {
    readMoreSelectedPositive: false,
  };

  handleReadMoreClick = () => {
    const { readMoreSelectedPositive } = this.state;
    this.setState({ readMoreSelectedPositive: !readMoreSelectedPositive });
  };

  getAnalysisComponent = ({ analysisData }) => {
    const { readMoreSelectedPositive } = this.state;
    return (
      <div class="rounded-t-lg rounded-b-lg shadow-xl mb-8 sm:mr-4">
        <div class="rounded-t-lg bg-light-purple text-slate-gray pt-6 pb-4 mb-2 px-4">
          <div class="sm:mr-6 font-semibold uppercase">{this.props.title}</div>
        </div>
        {analysisData.map((data) => {
          const { positiveReviews, attribute } = data;
          if (isEmpty(positiveReviews)) return null;
          return (
            <div class="bg-white pb-6 px-4 rounded-b-lg">
              <div class="text-slate-gray uppercase font-light py-2">
                {ATTRIBUTES[attribute]}
              </div>

              <div>
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
                      onClick={this.handleReadMoreClick}
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
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { analysisData } = this.props;
    return this.getAnalysisComponent({
      analysisData,
    });
  }
}

export default GroupedAttributeInfo;
