import Rating from "../../components/Rating/Rating.js";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { isEmpty } from "../../utils/objectUtils.js";

export const getReviewSection = ({positiveReviews, negativeReviews}) => {
  return (
    <div class="bg-white pb-6 px-4 pt-6 rounded-b-lg leading-5">
      {!isEmpty(positiveReviews) && (
        <div>
          <div class="font-light mb-4 font-semibold text-sm uppercase">
            <HandThumbUpIcon class="h-4 w-4 inline mr-2" />
            Positive Reviews
          </div>
          <div class="overflow-y-scroll max-h-60 scrollbar">
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
      )}
      {!isEmpty(negativeReviews) && (
        <div
          class={`${
            negativeReviews.length > 0 ? "mt-8" : "mt-0"
          } mb-4 leading-5`}
        >
          <div class="font-light mb-4 font-semibold text-sm uppercase">
            <HandThumbDownIcon class="h-4 w-4 inline mr-2" />
            Negative Reviews
          </div>
          <div class="overflow-y-scroll max-h-60 scrollbar">
            {negativeReviews.map((review) => {
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
