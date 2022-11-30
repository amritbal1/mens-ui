import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getProductData } from "../services/ProductDataService/ProductDataService";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import { isEmpty } from "../utils/objectUtils";
import { REGION, S3_BUCKET } from "../aws-config";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/Carousel/Carousel";
import { getPricingData } from "../services/PricingDataService";

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
              />
            </div>
          </div>

          <div className="max-w-2xl min-w-full pl-5 pr-3">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white"></div>
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
