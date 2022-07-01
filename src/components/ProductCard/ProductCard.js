import { PureComponent } from "react";
import { REGION, S3_BUCKET } from "../../aws-config";
import RatingStar from "../Rating/Rating";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ThumbUpIcon,
  ThumbDownIcon,
} from "@heroicons/react/outline";
import { isEmpty } from "../../utils/objectUtils";
import "./circle.css";
class ProductCard extends PureComponent {
  state = {
    displayChevron: true,
  };

  handleMouseEnter = (e) => {
    this.setState({ displayChevron: false });
  };
  handleMouseLeave = (e) => {
    this.setState({ displayChevron: true });
  };

  render() {
    const { data } = this.props;
    const { displayChevron } = this.state;
    const { dbg_recommendationScore, productDetails, reviewData } = data;
    const { productName, brandName, mainImageUrl, affiliateProductUrl, price } =
      productDetails;
    const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${mainImageUrl}`;
    const { averageStarRating, criteriaData, pros, cons } = reviewData;
    const { skinTypeData, skinConcernData } = criteriaData;
    const { skinType, percentage: skinTypePercentage } = skinTypeData;
    const { skinConcern, percentage: skinConcernPercentage } = skinConcernData;
    return (
      <div class="p-1 sm:p-4 mb-8 sm:mb-4">
        <figure class="border rounded-md max-w-20 mx-auto cursor-pointer bg-white">
          <div class="flex justify-end mt-4 mr-4">
            <div class="flex items-center justify-center rounded-full">
              <div class="flex flex-col justify-center items-center">
                <div
                  class="pie"
                  style={{
                    "--p": dbg_recommendationScore,
                    "--c": "#73B8B2",
                    "--b": "3px",
                  }}
                >
                  <div class="flex flex-col justify-center items-center">
                    <div class="text-xl text-slate-gray font-thin mb-2">
                      {dbg_recommendationScore}
                    </div>
                    <div class="text-xs text-slate-gray font-extralight">
                      Matching
                    </div>
                    <div class="text-xs text-slate-gray font-extralight">
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
                  class="h-full w-full object-cover rounded-t-md border-b"
                />
              </div>
            </div>
          </div>
          <figcaption class="py-4 px-6">
            <div class="text-xs font-extralight text-slate-gray mb-2">
              {brandName}
            </div>
            <div class="flex justify-between mb-8 text-slate-gray">
              <div class="uppercase tracking-widest text-xs text-slate-gray">
                {productName}
              </div>
            </div>
            <div class="mb-4 flex">
              <span class="flex-shrink-0 text-sm font-extralight text-slate-gray mr-2">
                Average rating
              </span>
              <div class="flex flex-shrink-0">
                <RatingStar value={averageStarRating} />
                <span class="ml-2 text-sm font-light text-slate-gray">
                  {averageStarRating}
                </span>
              </div>
            </div>
            <div class="mb-8 flex">
              <span class="text-sm font-extralight text-slate-gray mr-2">
                Rated positively by users with
                <br />
                {` ${skinType} skin`}:{" "}
                <span class="font-light">{skinTypePercentage}%</span>
                <br />
                {` ${skinConcern}`}:{" "}
                <span class="font-light">{skinConcernPercentage}%</span>
              </span>
            </div>
            <div class="mb-8">
              {!isEmpty(pros) && (
                <div class="flex mb-4">
                  <span class="flex items-center mr-2">
                    <ThumbUpIcon class="h-4 w-4 stroke-1" />
                  </span>
                  {pros.map((pro) => {
                    return (
                      <div class="text-sm font-extralight text-slate-gray flex flex-shrink-0 border border-gray-300 rounded-full mr-2 py-1 px-2">
                        {pro}
                      </div>
                    );
                  })}
                </div>
              )}
              {!isEmpty(cons) && (
                <div class="flex">
                  <span class="flex items-center mr-2">
                    <ThumbDownIcon class="h-4 w-4 stroke-1" />
                  </span>
                  {cons.map((con) => {
                    return (
                      <div class="text-sm font-extralight text-slate-gray flex flex-shrink-0 border border-gray-300 rounded-full mr-2 py-1 px-2">
                        {con}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div class="flex justify-between items-center mb-4">
              <a
                href={affiliateProductUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="w-4/5"
              >
                <button
                  class="w-full flex-shrink-0 bg-gray-900 text-gray-50 tracking-wide py-3 sm:py-2 px-6 rounded-lg shadow-md focus:outline-none sm:hover:opacity-60"
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <div class="flex justify-center items-center text-sm">
                    Shop Now
                    {displayChevron ? (
                      <ChevronRightIcon className="h-4 w-4 ml-3" />
                    ) : (
                      <ArrowRightIcon class="h-4 w-4 ml-3" />
                    )}
                  </div>
                </button>
              </a>
              {price && <span class="font-normal text-sm px-2 text-slate-gray">£{price}</span>}
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default ProductCard;
