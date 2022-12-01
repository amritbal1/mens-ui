import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getProductData } from "../services/ProductDataService/ProductDataService";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import { isEmpty } from "../utils/objectUtils";
import { REGION, S3_BUCKET } from "../aws-config";
import Carousel from "../components/Carousel/Carousel";
import { getPricingData } from "../services/PricingDataService";
import { Tab, Disclosure } from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import MainMenu from "../components/MainMenu/MainMenu";

const TAB_BUTTON_STYLE =
  "justify-between py-4 text-left uppercase pr-1 text-lg border-b";

const TAB_PANEL_STYLE =
  "text-slate-gray text-lg leading-8 tracking-wider mb-6 uppercase";

const TAB_PANEL_TEXT = "text-base leading-7 text-slate-gray-light";

const DISCLOSURE_BUTTON_STYLE =
  "flex w-full justify-between py-4 text-left pr-1 text-sm sm:text-base uppercase";

const DISCLOSURE_PANEL_STLYE =
  "mt-2 text-slate-gray text-sm sm:text-base leading-5 sm:leading-6 tracking-wider mb-6";

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
          <div class="h-full self-start w-full flex py-6 lg:py-12 px-6 sm:px-16">
            <ProductInfo
              pricingData={pricingData}
              productDetails={productData}
            />
          </div>
        </div>
        {/* TABS */}
        <div className="w-full py-8 px-12 bg-light-gray">
          <Tab.Group>
            <Tab.List className="text-center">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "font-normal text-slate-gray text-base uppercase tracking-widest mx-12 pb-6",
                      selected ? "border-b" : ""
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
                  className={classNames(
                    "rounded-xl bg-light-gray p-3",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <div class="font-light text-base leading-7">{item.content}</div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
        {/* On Large Screens, show vertical tabs */}
        {/* <div class="px-16 py-6 bg-white">
          <Tab.Group>
            <span>
              <Tab.List>
                <Tab
                  className={({ selected }) =>
                    `${TAB_BUTTON_STYLE} ${
                      selected
                        ? "text-slate-gray border-t"
                        : "text-gray-300 border-t"
                    }`
                  }
                >
                  Benefits
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `${TAB_BUTTON_STYLE} ${
                      selected ? "text-slate-gray" : "text-gray-300"
                    }`
                  }
                >
                  How To Use
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `${TAB_BUTTON_STYLE} ${
                      selected ? "text-slate-gray" : "text-gray-300"
                    }`
                  }
                >
                  Ingredients
                </Tab>
              </Tab.List>
            </span>
            <span class="py-4 px-10 bg-light-gray border-t">
              <Tab.Panels>
                <Tab.Panel>
                  <div class={TAB_PANEL_STYLE}>Benefits</div>
                  <div class={TAB_PANEL_TEXT}>{benefits}</div>
                </Tab.Panel>
                <Tab.Panel class="text-lg leading-6">
                  <div class={TAB_PANEL_STYLE}>How To Use</div>
                  <div class={TAB_PANEL_TEXT}>{howToUse}</div>
                </Tab.Panel>
                <Tab.Panel>
                  <div class={TAB_PANEL_STYLE}>Ingredients</div>
                  <div class={TAB_PANEL_TEXT}>{ingredients.join(", ")}</div>
                </Tab.Panel>
              </Tab.Panels>
            </span>
          </Tab.Group>
        </div> */}
        {/* On Medium and Smaller Screens, show horizontal Disclosure menu */}
        <div class="block lg:hidden w-full px-6 sm:px-16 pt-2 sm:pt-4 pb-10 bg-white">
          <Disclosure>
            {({ open }) => (
              <div class="border-b border-gray-300">
                <Disclosure.Button className={DISCLOSURE_BUTTON_STYLE}>
                  <div class="flex w-full justify-between">
                    <span>Benefits</span>
                    {open ? (
                      <MinusIcon className="h-5 w-5 sm:h-6 sm:w-6  text-slate-gray" />
                    ) : (
                      <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-gray" />
                    )}
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className={DISCLOSURE_PANEL_STLYE}>
                  {benefits}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div class="border-b border-gray-300">
                <Disclosure.Button className={DISCLOSURE_BUTTON_STYLE}>
                  <div class="flex w-full justify-between">
                    <span>How To Use</span>
                    {open ? (
                      <MinusIcon className="h-5 w-5 sm:h-6 sm:w-6  text-slate-gray" />
                    ) : (
                      <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-gray" />
                    )}
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className={DISCLOSURE_PANEL_STLYE}>
                  {howToUse}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <div class="border-b border-gray-300">
                <Disclosure.Button className={DISCLOSURE_BUTTON_STYLE}>
                  <div class="flex w-full justify-between">
                    <span>Ingredients</span>
                    {open ? (
                      <MinusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-gray" />
                    ) : (
                      <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-gray" />
                    )}
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className={DISCLOSURE_PANEL_STLYE}>
                  {ingredients.join(", ")}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
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
        <MainMenu userCountry={userCountry} />
        <div class={`${backgroundOpacity}`}>
          {this.renderProduct({ productData })}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductPage);
