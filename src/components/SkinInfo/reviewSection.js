import Rating from "../../components/Rating/Rating.js";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { isEmpty } from "../../utils/objectUtils.js";

export const getReviewSection = ({ positiveReviews, negativeReviews, id }) => {
  return (
    <div class="bg-white pb-6 px-4 pt-6 rounded-b-lg leading-5 sm:h-max-100">
      {!isEmpty(positiveReviews) && (
        <div>
          <div class="font-light mb-4 font-semibold text-sm uppercase flex items-center">
            <HandThumbUpIcon class="h-4 w-4 inline mr-2" />
            Positive Reviews
          </div>
          <div
            class={`overflow-y-scroll scrollbar ${
              isEmpty(negativeReviews) ? "max-h-80" : "max-h-36"
            }`}
            id={`${id}-positive`}
          >
            {positiveReviews.map((review, i) => {
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
        <div>
          {!isEmpty(positiveReviews) && <div class="border-t mt-6" />}
          <div
            class={`${
              positiveReviews.length > 0 ? "mt-6" : "mt-0"
            } mb-4 leading-5`}
          >
            <div class="font-light mb-4 font-semibold text-sm uppercase flex items-center">
              <HandThumbDownIcon class="h-4 w-4 inline mr-2" />
              Negative Reviews
            </div>
            <div
              class={`overflow-y-scroll scrollbar ${
                isEmpty(positiveReviews) ? "max-h-80" : "max-h-36"
              }`}
              id={`${id}-negative`}
            >
              {negativeReviews.map((review, i) => {
                const starRatingValue = Number(review.stars.substring(0, 3));
                return (
                  <div class="mb-6 text-sm font-thin">
                    <Rating value={starRatingValue} />"{review.review_text}"
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
