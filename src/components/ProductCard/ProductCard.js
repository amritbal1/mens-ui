import { PureComponent } from "react";
import { SORTING_FIELD } from "../../utils/enums";
import { REGION, S3_BUCKET } from "../../aws-config";
import RatingStar from "../Rating/Rating";

class ProductCard extends PureComponent {
  handleProductCardClick = async ({ productId }) => {
    const { history } = this.props;
    history.push(
      `/product?productId=${productId}&skinTypes=null&skinConcerns=null&productCharacteristics=null&starRating=null&withImages=null&sort=${SORTING_FIELD.MOST_RECENT}&productCategories=null&pageNumber=1`
    );
  };

  render() {
    const { data } = this.props;
    const { productDetails, reviewData } = data;
    const { productId, productName, brandName, mainImageUrl } = productDetails;
    const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${mainImageUrl}`;
    const { starRating } = reviewData;
    return (
      <div class="p-1 sm:p-4 mb-8 sm:mb-4">
        <figure
          class="max-w-16 sm:max-w-20 mx-auto cursor-pointer bg-white transition-transform transform md:hover:scale-105 md:hover:shadow-lg"
          onClick={() => this.handleProductCardClick({ productId: productId })}
        >
          <div class="relative pt-full">
            <div class="absolute inset-0 h-full w-full my-auto mx-auto">
              <img
                src={s3ImageUrl}
                alt="product"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
          <figcaption class="pt-2 pr-2 sm:py-4 sm:px-6">
            <div class="text-xs font-extralight text-slate-gray mb-1">
              {brandName}
            </div>
            {starRating !== 0 && (
              <div class="pb-2">
                <RatingStar value={starRating} />
              </div>
            )}
            <div class="flex justify-between mt-2 text-slate-gray">
              <div class="uppercase tracking-widest text-xs text-slate-gray">
                {productName}
              </div>
              {/* TODO: Add price when we add affiliate data */}
              {/* <div class="font-semibold">£{price}</div> */}
            </div>
            {/* TODO: Add code back once Product Finder is re-added */}
            {/* <div class="mt-3 md:mt-5">
              <CriteriaData criteriaData={criteriaData} />
            </div> */}
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default ProductCard;
