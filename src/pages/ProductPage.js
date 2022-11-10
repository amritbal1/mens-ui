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
  SKIN_TYPE_ATTRIBUTES,
  SKIN_CONCERN_ATTRIBUTES,
  ATTRIBUTES,
} from "../components/ProductCard/attributes";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { getArrayValue } from "../utils/urlUtils/urlValueGetter";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { getPricingData } from "../services/PricingDataService";

const DISCLOSURE_BUTTON_STYLE =
  "w-full flex justify-between rounded-lg bg-lilac-100 px-4 py-2 text-left text-sm font-medium text-dark-teal hover:bg-lilac-200 focus:outline-none focus-visible:ring focus-visible:ring-lilac-500 focus-visible:ring-opacity-75 w-96";
const DISCLOSURE_PANEL_STYLE = "pb-2 text-sm text-gray-500";
const CHEVRON_STYLE = "h-5 w-5 text-dark-teal";
//Page to display information for a single product
class ProductPage extends PureComponent {
  state = {
    productData: null,
    allProductImageUrls: [],
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
    const pricingData = await getPricingData({ productId });
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
      pricingData,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { productId: prevProductId } = queryString.parse(
      prevProps.location.search
    );
    const { productId: currentProductId } = queryString.parse(
      this.props.location.search
    );
    if (this.props.userCountry !== prevProps.userCountry) {
      const pricingData = await getPricingData({ productId: currentProductId });
      this.setState({ pricingData });
    }
    //If the URL params (productId) change, fetch new data which gets passed into ReviewListProvider
    if (prevProductId !== currentProductId) {
      const pricingData = await getPricingData({ productId: currentProductId });
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
        pricingData
      });
    }
  }

  setScrollToTop = ({ infoValue }) => {
    let scrollDiv = document.getElementById(`${infoValue}`);
    if (scrollDiv) scrollDiv.scrollTop = 0;
  };

  renderProduct = ({ productData }) => {
    const { allProductImageUrls, pricingData } = this.state;
    const {
      overallMetrics: {
        attributeAnalysis,
        skinTypeAnalysis,
        skinConcernAnalysis,
      },
      querySkinType,
      querySkinConcern,
    } = productData;
    const matchingSkinType = skinTypeAnalysis.find(
      (el) => el.attribute === SKIN_TYPE_ATTRIBUTES[querySkinType]
    );

    const amendedAnalysisData = skinConcernAnalysis.map((data) => {
      return data.attribute === "dry skin"
        ? { ...data, attribute: "dryness" }
        : data;
    });

    const matchingSkinConcerns = querySkinConcern.map((skinConcern) => {
      const matching = amendedAnalysisData.find(
        (el) => el.attribute === SKIN_CONCERN_ATTRIBUTES[skinConcern]
      );
      return matching.overallScore;
    });

    return (
      <div>
        <div class="flex flex-col items-center mb-2 sm:mb-6 justify-center">
          <div class="flex flex-col sm:flex sm:flex-row sm:mb-6">
            <div class="w-300px h-300px md:w-450px md:h-450px self-center sm:self-start">
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
            <div class="flex self-start w-screen pt-4 lg:pt-0 sm:max-w-xs md:pl-0 md:pr-4 lg:ml-14 sm:pb-4 px-5">
              <ProductInfo
                pricingData={pricingData}
                productDetails={productData}
                attributeAnalysis={attributeAnalysis}
              />
            </div>
          </div>

          <div className="max-w-2xl min-w-full pl-5 pr-3">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
              {/* MATCHING SCORES  */}
              <div class="text-sm font-light text-slate-gray pb-6 sm:pb-8 self-start sm:self-center sm:flex">
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
              {/* REVIEWS */}
              <div class="font-light text-sm font-normal uppercase tracking-wider text-slate-gray pb-4">
                What the reviews say
              </div>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className={DISCLOSURE_BUTTON_STYLE}>
                      <span>Skin Types</span>
                      {open ? (
                        <ChevronDownIcon className={CHEVRON_STYLE} />
                      ) : (
                        <ChevronUpIcon className={CHEVRON_STYLE} />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel className={DISCLOSURE_PANEL_STYLE}>
                      <SkinInfo
                        analysisData={skinTypeAnalysis}
                        infoValue={"skinType"}
                        queryTerm={querySkinType}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-2">
                {({ open }) => (
                  <>
                    <Disclosure.Button className={DISCLOSURE_BUTTON_STYLE}>
                      <span>Skin Concerns</span>
                      {open ? (
                        <ChevronDownIcon className={CHEVRON_STYLE} />
                      ) : (
                        <ChevronUpIcon className={CHEVRON_STYLE} />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel className={DISCLOSURE_PANEL_STYLE}>
                      <SkinInfo
                        analysisData={skinConcernAnalysis}
                        infoValue={"skinConcern"}
                        queryTerm={querySkinConcern}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              {attributeAnalysis.map((attribute) => {
                const { attribute: attributeName, overallScore } = attribute;
                return (
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className={DISCLOSURE_BUTTON_STYLE}>
                          <span>{ATTRIBUTES[attributeName]}</span>
                          <div class="flex">
                            <span class="mr-1">{overallScore}%</span>
                            {overallScore > 60 ? (
                              <span>
                                <HandThumbUpIcon class="h-4 w-4 inline mr-4" />
                              </span>
                            ) : (
                              <span>
                                <HandThumbDownIcon class="h-4 w-4 inline mr-4" />
                              </span>
                            )}
                            {open ? (
                              <ChevronDownIcon className={CHEVRON_STYLE} />
                            ) : (
                              <ChevronUpIcon className={CHEVRON_STYLE} />
                            )}
                          </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className={DISCLOSURE_PANEL_STYLE}>
                          <AttributeInfo analysisData={attribute} />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { productData } = this.state;
    const { backgroundOpacity, userCountry, handleCountryChange } = this.props;
    if (isEmpty(productData)) return null;

    return (
      <div class="bg-white">
        <Navbar
          userCountry={userCountry}
          handleCountryChange={handleCountryChange}
        />
        <div class="h-60px"></div>
        <div class={`py-8 ${backgroundOpacity}`}>
          {this.renderProduct({ productData })}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductPage);
