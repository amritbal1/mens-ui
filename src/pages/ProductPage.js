import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getProductData } from "../services/ProductDataService/ProductDataService";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import { isEmpty } from "../utils/objectUtils";
import { REGION, S3_BUCKET } from "../aws-config";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/Carousel/Carousel";
import SkinInfo from "../components/SkinInfo/SkinInfo";
import AttributeInfo from "../components/AttributeInfo/AttributeInfo";
import {
  ATTRIBUTE_LABELS_POSITIVE,
  ATTRIBUTE_LABELS_NEGATIVE,
  SKIN_TYPE_ATTRIBUTES,
  SKIN_CONCERN_ATTRIBUTES,
} from "../components/ProductCard/attributes";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getArrayValue } from "../utils/urlUtils/urlValueGetter";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
const PILL_STYLE =
  "text-xs font-light text-slate-gray border rounded-full mr-1 p-2 sm:px-3 cursor-pointer";
const SELECTED_PILL_STYLE = `${PILL_STYLE} bg-gray-100 border border-gray-400`;

//Page to display information for a single product
class ProductPage extends PureComponent {
  state = {
    productData: null,
    allProductImageUrls: [],
    selectedAttribute: {},
    skinTypeSelected: true,
    skinConcernSelected: false,
  };

  getImageUrls = ({ images }) => {
    return !isEmpty(images)
      ? images.map((imageUrl) => {
          return `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${imageUrl}`;
        })
      : [];
  };

  async componentDidMount() {
    const searchParams = queryString.parse(this.props.location.search);
    const { productId, skinType, skinConcern } = searchParams;
    const skinConcerns = getArrayValue({ parameterValue: skinConcern });
    const productData = await getProductData({
      productId,
      skinType,
      skinConcerns,
    });
    if (!productData) return;
    const { additionalImages } = productData;
    //NB - must update the new image URLs here otherwise they don't update when user navigates to a different product page
    const allProductImageUrls = this.getImageUrls({ images: additionalImages });
    this.setState({
      productData,
      allProductImageUrls,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { productId: prevProductId } = queryString.parse(
      prevProps.location.search
    );
    const { productId: currentProductId } = queryString.parse(
      this.props.location.search
    );
    //If the URL params (productId) change, fetch new data which gets passed into ReviewListProvider
    if (prevProductId !== currentProductId) {
      const productData = await getProductData({ productId: currentProductId });
      if (!productData) return;
      const { additionalImages } = productData;
      //NB - must update the new image URLs here otherwise they don't update when user navigates to a different product page
      const allProductImageUrls = this.getImageUrls({
        images: additionalImages,
      });
      this.setState({
        productData,
        allProductImageUrls,
      });
    }
  }

  handlePillChange = ({ attributeName, type }) => {
    const { productData } = this.state;
    if (type === "attribute") {
      const selectedAttribute =
        productData.overallMetrics.attributeAnalysis.find(
          (el) => el.attribute === attributeName
        );
      this.setState(
        {
          selectedAttribute,
          skinTypeSelected: false,
          skinConcernSelected: false,
        },
        () => {
          this.setScrollToTop({ infoValue: attributeName });
        }
      );
    } else if (type === "skinType") {
      this.setState(
        {
          skinTypeSelected: true,
          skinConcernSelected: false,
          selectedAttribute: {},
        },
        () => {
          this.setScrollToTop({ infoValue: "skinType" });
        }
      );
    } else if (type === "skinConcern") {
      this.setState(
        {
          skinConcernSelected: true,
          skinTypeSelected: false,
          selectedAttribute: {},
        },
        () => {
          this.setScrollToTop({ infoValue: "skinConcern" });
        }
      );
    }
  };

  skinTypePill = ({ skinTypeSelected }) => (
    <span
      class={skinTypeSelected ? SELECTED_PILL_STYLE : PILL_STYLE}
      onClick={() => this.handlePillChange({ type: "skinType" })}
    >
      Skin Types
    </span>
  );

  skinConcernPill = ({ skinConcernSelected }) => (
    <span
      class={skinConcernSelected ? SELECTED_PILL_STYLE : PILL_STYLE}
      onClick={() => this.handlePillChange({ type: "skinConcern" })}
    >
      Skin Concerns
    </span>
  );

  setScrollToTop = ({ infoValue }) => {
    let scrollDiv = document.getElementById(`${infoValue}`);
    if (scrollDiv) scrollDiv.scrollTop = 0;
  };

  renderProduct = ({ productData }) => {
    const {
      allProductImageUrls,
      selectedAttribute,
      skinTypeSelected,
      skinConcernSelected,
    } = this.state;
    const {
      overallMetrics: {
        attributeAnalysis,
        skinTypeAnalysis,
        skinConcernAnalysis,
      },
      querySkinType,
      querySkinConcern,
    } = productData;
    const selectedAttributeName = selectedAttribute.attribute;
    const matchingSkinType = skinTypeAnalysis.find(
      (el) => el.attribute === SKIN_TYPE_ATTRIBUTES[querySkinType]
    );
    const matchingSkinConcerns = querySkinConcern.map((skinConcern) => {
      const matching = skinConcernAnalysis.find(
        (el) => el.attribute === SKIN_CONCERN_ATTRIBUTES[skinConcern]
      );
      return matching.overallScore;
    });

    const attributePills = attributeAnalysis.map((attribute) => {
      const { overallScore, attribute: attributeName } = attribute;
      const attr = attributeAnalysis.find(
        (el) => el.attribute === attributeName
      );
      const selectedAttributeReviewNumber = !isEmpty(attr)
        ? attr.positiveReviews.length + attr.negativeReviews.length
        : 0;
      const style =
        attributeName === selectedAttributeName
          ? SELECTED_PILL_STYLE
          : PILL_STYLE;
      return overallScore > 50 ? (
        <span
          class={style}
          onClick={() =>
            this.handlePillChange({ attributeName, type: "attribute" })
          }
        >
          {ATTRIBUTE_LABELS_POSITIVE[attributeName]}
          {` (${selectedAttributeReviewNumber})`}
          <CheckIcon class="ml-1 inline h-3 w-3 text-green-700" />
        </span>
      ) : (
        <span
          class={style}
          onClick={() =>
            this.handlePillChange({ attributeName, type: "attribute" })
          }
        >
          {ATTRIBUTE_LABELS_NEGATIVE[attributeName]}
          {` (${selectedAttributeReviewNumber})`}
          <XMarkIcon class="ml-1 inline h-3 w-3 text-red-700" />
        </span>
      );
    });
    const allPills = [
      this.skinTypePill({ skinTypeSelected }),
      this.skinConcernPill({ skinConcernSelected }),
      ...attributePills,
    ];

    return (
      <div>
        <div class="flex flex-col items-center mb-2 sm:mb-6 justify-center">
          <div class="flex flex-col sm:flex sm:flex-row sm:mb-6">
            <div class="w-300px h-300px md:w-450px md:h-450px self-center">
              <Carousel
                images={allProductImageUrls}
                slidesToShow={1}
                imageWidth={
                  "w-min-300px h-min-300px md:w-min-450px md:h-min-450px"
                }
                handleImageClickFn={this.handleImageClickFn}
                showCursorOnHover={false}
              />
            </div>
            <div class="flex self-start w-full pt-4 lg:pt-0 sm:max-w-xs md:pl-0 md:pr-4 lg:ml-14 sm:pb-4 px-6">
              <ProductInfo
                productDetails={productData}
                attributeAnalysis={attributeAnalysis}
              />
            </div>
          </div>
          {/* MATCHING SCORES  */}
          <div class="text-sm font-light text-slate-gray pb-4 self-start sm:self-center sm:flex px-6">
            <span class="flex flex-shrink-0 items-start sm:mr-5">
              {` ${querySkinType} skin`}:
              <span class="flex flex-shrink-0 text-sm font-normal text-slate-gray ml-1">
                {matchingSkinType.overallScore}%{" "}
                {matchingSkinType.overallScore >= 50 ? (
                  <HandThumbUpIcon class="inline self-center h-3 w-3 ml-1" />
                ) : (
                  <HandThumbDownIcon class="inline self-center h-3 w-3 ml-1" />
                )}
              </span>
            </span>
            {querySkinConcern.map((concern, i) => {
              return (
                <span class="flex flex-shrink-0 items-start sm:mr-5">
                  {` ${concern === "Breakout" ? "Breakouts" : concern}`}:
                  <span class="flex flex-shrink-0 text-sm font-normal text-slate-gray ml-1">
                    {matchingSkinConcerns[i]}%{" "}
                    {matchingSkinConcerns[i] >= 50 ? (
                      <HandThumbUpIcon class="inline self-center h-3 w-3 ml-1" />
                    ) : (
                      <HandThumbDownIcon class="inline self-center h-3 w-3 ml-1" />
                    )}
                  </span>
                </span>
              );
            })}
          </div>

          {!isEmpty(allPills) && (
            <div class="sm:pt-4 max-w-full px-6">
              <div class="font-light text-sm font-normal uppercase tracking-wider text-slate-gray">
                What the reviews say
              </div>
              <div class="overflow-x-scroll scrollbar">
                <div class="mb-2 mt-4 whitespace-nowrap">{allPills}</div>
              </div>
            </div>
          )}

          <div class="pt-4 max-w-2xl px-6">
            {skinTypeSelected && (
              <SkinInfo
                analysisData={skinTypeAnalysis}
                infoValue={"skinType"}
                queryTerm={querySkinType}
              />
            )}
            {skinConcernSelected && (
              <SkinInfo
                analysisData={skinConcernAnalysis}
                infoValue={"skinConcern"}
                queryTerm={querySkinConcern}
              />
            )}
            {!skinTypeSelected &&
              !skinConcernSelected &&
              !isEmpty(selectedAttribute) && (
                <AttributeInfo analysisData={selectedAttribute} />
              )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { productData } = this.state;
    const { backgroundOpacity } = this.props;
    if (isEmpty(productData)) return null;

    return (
      <div class="bg-white">
        <Navbar />
        <div class="h-60px"></div>
        <div class={`py-8 ${backgroundOpacity}`}>
          {this.renderProduct({ productData })}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductPage);
