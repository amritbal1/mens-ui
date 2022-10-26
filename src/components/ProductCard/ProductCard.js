import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { PureComponent } from "react";
import { REGION, S3_BUCKET } from "../../aws-config";
import { isEmpty } from "../../utils/objectUtils";
import "./circle.css";
import queryString from "query-string";

const isSmallBreakpoint = window.screen.width <= 640;
const styleObj = isSmallBreakpoint
  ? { "--w": "3.3rem", "--l": "0.7rem" }
  : { "--w": "5.3rem", "--l": "0.95rem" };
class ProductCard extends PureComponent {
  state = {
    displayChevron: true,
  };

  handleProductCardClick = async ({ productId }) => {
    const { history } = this.props;
    const searchParams = queryString.parse(window.location.search);
    const skinType = searchParams["skinTypes"];
    const skinConcern = searchParams["skinConcerns"];
    history.push(
      `/product?productId=${productId}&skinType=${skinType}&skinConcern=${skinConcern}`
    );
  };

  handleMouseEnter = (e) => {
    this.setState({ displayChevron: false });
  };
  handleMouseLeave = (e) => {
    this.setState({ displayChevron: true });
  };

  render() {
    const { data } = this.props;
    const { dbg_recommendationScore, productDetails, reviewData, dbg_price } =
      data;
    const [price] = dbg_price;
    const { productName, brandName, mainImageUrl, productId } = productDetails;
    const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${mainImageUrl}`;
    const { criteriaData, pros, cons } = reviewData;
    const { skinTypeAnalysis, skinConcernAnalysis } = criteriaData;
    const { skinType, overallScore: skinTypeOverallScore } = skinTypeAnalysis;
    const { skinConcern, overallScore: skinConcernOverallScore } =
      skinConcernAnalysis;
    return (
      <div class="p-1 sm:p-4 mb-8 sm:mb-4">
        <figure
          class="border rounded-md max-w-20 mx-auto bg-white cursor-pointer transition-transform transform sm:hover:scale-105 sm:hover:shadow-lg shadow-xl"
          onClick={() => this.handleProductCardClick({ productId: productId })}
        >
          <div class="flex justify-end mt-4 mr-4">
            <div class="flex items-center justify-center rounded-full">
              <div class="flex flex-col justify-center items-center">
                <div
                  class="pie"
                  style={{
                    "--p": dbg_recommendationScore,
                    "--c": "#73B8B2",
                    "--b": "3px",
                    ...styleObj,
                  }}
                >
                  <div class="flex flex-col justify-center items-center">
                    <div class="text-sm sm:text-xl text-slate-gray font-thin mb-1 sm:mb-2">
                      {dbg_recommendationScore}
                    </div>
                    <div class="text-xxs sm:text-xs text-slate-gray font-extralight">
                      Matching
                    </div>
                    <div class="text-xxs sm:text-xs text-slate-gray font-extralight">
                      Score
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="relative pt-full">
              <div class="absolute inset-0 h-full w-full my-auto mx-auto">
                <img
                  src={s3ImageUrl}
                  alt="product"
                  class="h-full w-full object-cover rounded-t-md"
                />
              </div>
            </div>
          </div>
          <div class="h-2 border-b" />
          <figcaption class="px-2 py-2 sm:py-4 sm:px-6">
            <div class="text-xs font-light text-slate-gray mb-2">
              {brandName}
            </div>
            <div class="flex justify-between mb-4 text-slate-gray">
              <div class="text-xs sm:text-sm uppercase tracking-wide text-slate-gray">
                {productName}
              </div>
            </div>
            <div class="pb-3 sm:pb-4 text-xs sm:text-sm font-normal text-slate-gray">{`~£ ${(
              Math.round(price * 100) / 100
            ).toFixed(2)}`}</div>
            <div class="mb-2 sm:mb-4 flex">
              <span class="text-xs sm:text-sm font-light text-slate-gray">
                <span class="flex flex-shrink-0 items-start">
                  {` ${skinType} skin`}:
                  <span class="flex flex-shrink-0 text-xs sm:text-sm font-normal text-slate-gray ml-1">
                    {skinTypeOverallScore}%{" "}
                    {skinTypeOverallScore >= 50 ? (
                      <HandThumbUpIcon class="inline self-center h-3 w-3 ml-1" />
                    ) : (
                      <HandThumbDownIcon class="inline self-center h-3 w-3 ml-1" />
                    )}
                  </span>
                </span>
                {skinConcern.map((concern, i) => {
                  return (
                    <span class="flex flex-shrink-0 items-start">
                      {` ${
                        concern === "Breakout"
                          ? "Breakouts"
                          : concern
                      }`}
                      :
                      <span class="flex flex-shrink-0 text-xs sm:text-sm font-normal text-slate-gray ml-1">
                        {skinConcernOverallScore[i]}%{" "}
                        {skinConcernOverallScore[i] >= 50 ? (
                          <HandThumbUpIcon class="inline self-center h-3 w-3 ml-1" />
                        ) : (
                          <HandThumbDownIcon class="inline self-center h-3 w-3 ml-1" />
                        )}
                      </span>
                    </span>
                  );
                })}
              </span>
            </div>
            <div>
              {!isEmpty(pros) && (
                <div class="flex flex-wrap mb-4">
                  <span class="flex items-center mr-2"></span>
                  {pros.map((pro) => {
                    return (
                      <div class="text-xs font-extralight text-slate-gray flex flex-shrink-0 border sm:border-0.5 border-gray-300 rounded-full mr-2 py-1 px-2 mb-1">
                        {pro}
                      </div>
                    );
                  })}
                </div>
              )}
              {!isEmpty(cons) && (
                <div class="flex flex-wrap">
                  <span class="flex items-center mr-2"></span>
                  {cons.map((con) => {
                    return (
                      <div class="text-xs font-extralight text-slate-gray flex flex-shrink-0 border sm:border-0.5 border-gray-300 rounded-full mr-2 py-1 px-2 mb-1">
                        {con}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default ProductCard;
