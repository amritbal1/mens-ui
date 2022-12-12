import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getProductData } from "../services/ProductDataService/ProductDataService";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import { isEmpty } from "../utils/objectUtils";
import { REGION, S3_BUCKET } from "../aws-config";
import Carousel from "../components/Carousel/Carousel";
import { getPricingData } from "../services/PricingDataService";
import { Tab } from "@headlessui/react";
import MainMenu from "../components/MainMenu/MainMenu";
import { CheckIcon, MinusSmallIcon } from "@heroicons/react/24/outline";
//Page to display information for a single product
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    const { userCountry } = this.props;
    const searchParams = queryString.parse(this.props.location.search);
    const { productId } = searchParams;
    const pricingData = await getPricingData({
      productId,
      country: userCountry,
    });
    const productData = await getProductData({
      productId,
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
      const pricingData = await getPricingData({
        productId: currentProductId,
        country: this.props.userCountry,
      });
      this.setState({ pricingData });
    }
    //If the URL params (productId) change, fetch new data which gets passed into ReviewListProvider
    if (prevProductId !== currentProductId) {
      const pricingData = await getPricingData({
        productId: currentProductId,
        country: this.props.userCountry,
      });
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
        pricingData,
      });
    }
  }

  setScrollToTop = ({ infoValue }) => {
    let scrollDiv = document.getElementById(`${infoValue}`);
    if (scrollDiv) scrollDiv.scrollTop = 0;
  };

  renderProduct = ({ productData }) => {
    const { allProductImageUrls, pricingData } = this.state;
    const { ingredients = [], howToUse = "", benefits = "" } = productData;
    const categories = {
      "How To Use": {
        id: "howToUse",
        content: howToUse,
      },
      Benefits: {
        id: "benefits",
        content: benefits,
      },
      Ingredients: {
        id: "ingredients",
        content:
          ingredients.length > 1 ? ingredients.join(", ") : ingredients[0],
      },
    };
    return (
      <div class="w-full mx-auto pb-6 min-h-screen bg-stone">
        <div class="lg:grid lg:grid-cols-2 lg:max-w-7xl mx-auto">
          <div class="flex justify-center py-6 lg:py-12">
            <div class="w-300px h-300px md:w-600px md:h-600px self-center justify-self-center bg-darkStone">
              <Carousel
                images={allProductImageUrls}
                slidesToShow={1}
                imageWidth={
                  "w-min-300px h-min-300px md:w-min-600px md:h-min-600px"
                }
                handleImageClickFn={this.handleImageClickFn}
                showCursorOnHover={false}
              />
            </div>
          </div>
          <div class="h-full self-start w-full flex py-6 lg:py-12 px-6 sm:px-16">
            <ProductInfo
              pricingData={pricingData}
              productDetails={productData}
            />
          </div>
        </div>
        {/* TABS */}
        <div className="lg:max-w-7xl mx-auto h-full py-10 px-2 sm:py-8 sm:px-12 bg-darkStone mx-0 mb-6">
          <Tab.Group>
            <Tab.List className="text-center">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "font-normal text-slate-gray text-xs sm:text-base uppercase tracking-widest mx-4 pb-4 sm:mx-12 sm:pb-6",
                      selected ? "border-b-2 border-moonlitMedium" : ""
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((item, idx) => (
                <Tab.Panel key={idx} className={classNames("px-3 pb-3 pt-12")}>
                  <div class="font-light text-xs sm:text-base leading-6 sm:leading-7">
                    {Array.isArray(item.content)
                      ? item.content.map((info) => (
                          <div class="mb-6">
                            {item.id === "benefits" ? (
                              <CheckIcon class="inline h-4 w-4 text-gray-500 mr-4" />
                            ) : (
                              <MinusSmallIcon class="inline h-4 w-4 text-gray-500 mr-4" />
                            )}
                            <span>{info}</span>
                          </div>
                        ))
                      : item.content}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  render() {
    const { productData } = this.state;
    const { backgroundOpacity, userCountry, handleCountryChange } = this.props;
    if (isEmpty(productData)) return null;

    return (
      <div>
        <MainMenu
          userCountry={userCountry}
          handleCountryChange={handleCountryChange}
        />
        <div class={`${backgroundOpacity}`}>
          {this.renderProduct({ productData })}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductPage);
