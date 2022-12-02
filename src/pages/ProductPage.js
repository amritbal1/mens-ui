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
    const searchParams = queryString.parse(this.props.location.search);
    const { productId } = searchParams;
    const pricingData = await getPricingData({ productId });
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
      Benefits: {
        id: 1,
        content: benefits,
      },
      "How To Use": {
        id: 2,
        content: howToUse,
      },
      Ingredients: {
        id: 3,
        content: ingredients.join(", "),
      },
    };
    return (
      <div class="lg:max-w-7xl mx-auto">
        <div class="lg:grid lg:grid-cols-2">
          <div class="flex justify-center py-6 lg:py-12">
            <div class="w-300px h-300px md:w-600px md:h-600px self-center justify-self-center">
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
          <div class="bg-white h-full self-start w-full flex py-6 lg:py-12 px-6 sm:px-16">
            <ProductInfo
              pricingData={pricingData}
              productDetails={productData}
            />
          </div>
        </div>
        {/* TABS */}
        <div className="w-full py-10 px-2 sm:py-8 sm:px-12 bg-light-gray">
          <Tab.Group>
            <Tab.List className="text-center">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "font-normal text-slate-gray text-xs sm:text-base uppercase tracking-widest mx-4 pb-4 sm:mx-12 sm:pb-6",
                      selected ? "border-b-2" : ""
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((item, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames("bg-light-gray p-3")}
                >
                  <div class="font-light text-xs sm:text-base leading-6 sm:leading-7">
                    {item.content}
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
      <div class="bg-white h-screen">
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
