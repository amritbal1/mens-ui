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
} from "../components/ProductCard/attributes";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

//Page to display information for a single product
class ProductPage extends PureComponent {
  state = {
    productData: null,
    allProductImageUrls: [],
    selectedAttribute: {},
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
    const productData = await getProductData({
      productId,
      skinType,
      skinConcern,
    });
    if (!productData) return;
    const {
      additionalImages,
      overallMetrics: { attributeAnalysis },
    } = productData;
    //NB - must update the new image URLs here otherwise they don't update when user navigates to a different product page
    const allProductImageUrls = this.getImageUrls({ images: additionalImages });

    this.setState({
      productData,
      allProductImageUrls,
      selectedAttribute: attributeAnalysis[0],
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

  handleAttributeChange = ({ attributeName }) => {
    const { productData } = this.state;
    const selectedAttribute = productData.overallMetrics.attributeAnalysis.find(
      (el) => el.attribute === attributeName
    );
    this.setState({ selectedAttribute });
  };

  renderProduct = ({ productData }) => {
    const { allProductImageUrls, selectedAttribute } = this.state;
    const {
      overallMetrics: {
        attributeAnalysis,
        skinTypeAnalysis,
        skinConcernAnalysis,
      },
      querySkinType,
      querySkinConcern,
    } = productData;

    return (
      <div>
        <div class="flex flex-col items-center mb-2 sm:mb-6 justify-center">
          <div class="flex flex-col sm:flex sm:flex-row sm:mb-6">
            <div class="w-300px h-300px md:w-450px md:h-450px sm:mr-4 self-center">
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
            <div class="flex self-start w-full pt-4 lg:pt-0 md:w-1/3 md:pl-0 md:pr-4 lg:ml-14 pb-4 px-6">
              <ProductInfo
                productDetails={productData}
                attributeAnalysis={attributeAnalysis}
              />
            </div>
          </div>

          {!isEmpty(attributeAnalysis) && (
            <div class="sm:pt-4 w-full px-6">
              <div class="font-light text-sm font-normal mb-2 uppercase tracking-wider text-slate-gray">
                What the reviews say
              </div>
              <div class="flex flex-wrap">
                {attributeAnalysis.map((attribute) => {
                  const { overallScore, attribute: attributeName } = attribute;
                  return overallScore > 50 ? (
                    <span
                      class="text-xs font-light text-slate-gray border rounded-full p-1 mb-1 mr-1 px-2 cursor-pointer"
                      onClick={() =>
                        this.handleAttributeChange({ attributeName })
                      }
                    >
                      {ATTRIBUTE_LABELS_POSITIVE[attributeName]}
                      <CheckIcon class="ml-1 inline h-3 w-3 text-green-700" />
                    </span>
                  ) : (
                    <span
                      class="text-xs font-light text-slate-gray border rounded-full p-1 mb-1 mr-1 px-2 cursor-pointer"
                      onClick={() =>
                        this.handleAttributeChange({ attributeName })
                      }
                    >
                      {ATTRIBUTE_LABELS_NEGATIVE[attributeName]}
                      <XMarkIcon class="ml-1 inline h-3 w-3 text-red-700" />
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div class="pt-4 w-full px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
            {!isEmpty(skinTypeAnalysis) && (
              <SkinInfo
                analysisData={skinTypeAnalysis}
                infoValue={"skinType"}
                queryTerm={querySkinType}
              />
            )}
            {!isEmpty(skinConcernAnalysis) && (
              <SkinInfo
                analysisData={skinConcernAnalysis}
                infoValue={"skinConcern"}
                queryTerm={querySkinConcern}
              />
            )}
            {!isEmpty(selectedAttribute) && (
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
