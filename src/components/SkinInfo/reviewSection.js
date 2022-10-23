import Rating from "../../components/Rating/Rating.js";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { isEmpty } from "../../utils/objectUtils.js";
import {
  ATTRIBUTE_LABELS_NEGATIVE,
  ATTRIBUTE_LABELS_POSITIVE,
} from "../ProductCard/attributes.js";
import "./scorebar.css";
// import { VariableSizeList as List } from "react-window";

export const getReviewSection = ({
  positiveReviews,
  negativeReviews,
  overallScore,
  attribute,
  infoValue = "",
}) => {
  const data = [...positiveReviews, ...negativeReviews];
  // const rowHeights = data.map(() => 100);
  // const getItemSize = (index) => {
  //   console.log("returning height of", rowHeights[index])
  //   return rowHeights[index];
  // };
  const borderRadius =
    overallScore < 100
      ? { borderTopLeftRadius: "9999px", borderBottomLeftRadius: "9999px" }
      : { borderRadius: "9999px" };
  return (
    <div class="bg-white pb-6 px-4 pt-6 rounded-b-lg leading-5 sm:h-max-100">
      {!isEmpty(data) && (
        <div>
          <div class="font-light text-slate-gray tracking-tight text-sm mb-2">
            <span class="text-base font-semibold">{overallScore}% </span>rated
            positively
          </div>
          <div class="mb-8">
            <div class="bg-score-red h-2 rounded-full mb-1">
              <div
                class="scorebar"
                style={{
                  "--w": `${overallScore}%`,
                  backgroundColor: "#77c990",
                  height: "0.5rem",
                  ...borderRadius,
                }}
              ></div>
            </div>
            <div class="flex justify-between font-light text-xs">
              {overallScore > 0 && (
                <span>
                  <HandThumbUpIcon class="h-3 w-3 inline" />{" "}
                  {ATTRIBUTE_LABELS_POSITIVE[attribute]}
                </span>
              )}
              {overallScore < 100 && (
                <span>
                  <HandThumbDownIcon class="h-3 w-3 inline mr-1" />
                  {ATTRIBUTE_LABELS_NEGATIVE[attribute]}
                </span>
              )}
            </div>
          </div>
          <div class="font-light mb-4 font-semibold text-sm uppercase flex items-center">
            Reviews
          </div>
          <div id={infoValue} class={"overflow-y-scroll scrollbar max-h-72"}>
            {/* <List
              height={150}
              itemCount={data.length}
              itemSize={getItemSize}
              width={300}
              itemData={data}
            >
              {({ data, index, style }) => {
                const starRatingValue =
                  Number(data[index].stars.substring(0, 3)) || 2;
                return (
                  <li style={style}>
                    {
                      <div class="mb-6 text-sm font-thin">
                        <Rating value={starRatingValue} />"
                        {data[index].review_text}"
                      </div>
                    }
                  </li>
                );
              }}
            </List> */}
            {data.map((review, i) => {
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
