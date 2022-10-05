import Rating from "../../components/Rating/Rating.js";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { isEmpty } from "../../utils/objectUtils.js";
import {
  ATTRIBUTES,
  ATTRIBUTE_LABELS_NEGATIVE,
  ATTRIBUTE_LABELS_POSITIVE,
} from "../ProductCard/attributes.js";

export const getReviewSection = ({
  positiveReviews,
  negativeReviews,
  overallScore,
  attribute,
  type,
}) => {
  const allReviews = [...positiveReviews, ...negativeReviews];
  return (
    <div class="bg-white pb-6 px-4 pt-6 rounded-b-lg leading-5 sm:h-max-100">
      {!isEmpty(allReviews) && (
        <div>
          <div class="font-light text-slate-gray tracking-tight text-sm mb-2">
            <span class="text-base font-semibold">{overallScore}% </span>rated
            positively
          </div>
          <div class="mb-8">
            <div class="bg-score-red h-2 rounded-full mb-1">
              <div
                class={`w-${overallScore}% bg-score-green h-2 ${
                  overallScore < 100 ? "rounded-l-full" : "rounded-full"
                }`}
              ></div>
            </div>
            <div class="flex justify-between font-light text-xs">
              {overallScore > 0 && (
                <span>
                  <HandThumbUpIcon class="h-3 w-3 inline" />{" "}
                  {type === "skinInfo"
                    ? ATTRIBUTES[attribute]
                    : ATTRIBUTE_LABELS_POSITIVE[attribute]}
                </span>
              )}
              {overallScore < 100 && (
                <span>
                  <HandThumbDownIcon class="h-3 w-3 inline mr-1" />
                  {type === "skinInfo"
                    ? ATTRIBUTES[attribute]
                    : ATTRIBUTE_LABELS_NEGATIVE[attribute]}
                </span>
              )}
            </div>
          </div>
          <div class="font-light mb-4 font-semibold text-sm uppercase flex items-center">
            Reviews
          </div>
          <div class={"overflow-y-scroll scrollbar max-h-72"}>
            {allReviews.map((review, i) => {
              const starRatingValue = Number(review.stars.substring(0, 3));
              return (
                <div class="mb-6 text-sm font-thin">
                  <Rating value={starRatingValue} />"{review.review_text}"
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
