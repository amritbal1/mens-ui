import React, { Component } from "react";
import { isEmpty } from "../../utils/objectUtils";
import { ATTRIBUTES } from "../ProductCard/attributes";
import Rating from "../Rating/Rating.js";
class GroupedAttributeInfo extends Component {
  getAnalysisComponent = ({ analysisData }) => {
    return (
      <div class="rounded-t-lg rounded-b-lg shadow-xl mb-8 sm:mr-4">
        <div class="rounded-t-lg bg-light-purple text-slate-gray pt-6 pb-4 mb-2 px-4">
          <div class="sm:mr-6 font-semibold uppercase">{this.props.title}</div>
        </div>
        {analysisData.map((data, i) => {
          const { positiveReviews, attribute } = data;
          if (isEmpty(positiveReviews)) return null;
          return (
            <div
              class="bg-white pb-6 px-4 rounded-b-lg leading-5"
              key={`${i}-${attribute}`}
            >
              <div class="text-slate-gray uppercase font-light py-2">
                {ATTRIBUTES[attribute]}
              </div>
              <div class="overflow-y-scroll max-h-36 scrollbar">
                {positiveReviews.map((review) => {
                  const starRatingValue = Number(review.stars.substring(0, 3));
                  return (
                    <div class="mb-6 text-sm font-thin">
                      <Rating value={starRatingValue} />"{review.review_text}"
                    </div>
                  );
                })}
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
