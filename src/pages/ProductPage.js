import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getProductData } from "../services/ProductDataService/ProductDataService";
import { ReviewSummaryPanel } from "../components/ReviewSummaryPanel/ReviewSummaryPanel";
import ReviewsList from "../components/ReviewsList/ReviewsList";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import MediaLightbox from "../components/MediaLightbox/MediaLightbox";
import ReviewsListProvider from "../components/ReviewsList/ReviewsListProvider";
import { isEmpty } from "../utils/objectUtils";
import Carousel from "../components/Carousel/Carousel";
import { REGION, S3_BUCKET } from "../aws-config";
import Navbar from "../components/Navbar/Navbar";
import BeforeAfterImages from "../components/BeforeAfterImages/BeforeAfterImages";
import { productPageTitleStyle } from "../utils/styles";

//Page to display information for a single product
class ProductPage extends PureComponent {
  state = {
    productData: null,
    renderImagesModal: false,
    showLightboxModal: false,
    lightboxImages: null,
    lightboxImagesIndexToDisplay: 0,
    allReviewImageUrls: [],
    allProductImageUrls: [],
    allBeforeAfterImageUrls: [],
  };

  getImageUrls = ({ images }) => {
    return !isEmpty(images)
      ? images.map((imageUrl) => {
          return `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${imageUrl}`;
        })
      : [];
  };

  getBeforeAfterImageUrls = ({ beforeAfterImageData }) => {
    return beforeAfterImageData.reduce((acc, beforeAfterPair) => {
      if (
        isEmpty(beforeAfterPair) ||
        isEmpty(beforeAfterPair.beforeImages) ||
        isEmpty(beforeAfterPair.afterImages)
      ) {
        return acc;
      } else {
        //TODO: Eventually handle multiple before and after pics
        const beforeImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${beforeAfterPair.beforeImages[0]}`;
        const afterImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${beforeAfterPair.afterImages[0]}`;
        return [
          ...acc,
          { beforeImageUrl: [beforeImageUrl], afterImageUrl: [afterImageUrl] },
        ];
      }
    }, []);
  };

  async componentDidMount() {
    const searchParams = queryString.parse(this.props.location.search);
    const { productId } = searchParams;
    const productData = await getProductData({ productId });
    if (!productData) return;
    const { reviewImageData, additionalImages, beforeAfterImageData } =
      productData;
    //NB - must update the new image URLs here otherwise they don't update when user navigates to a different product page
    const allProductImageUrls = this.getImageUrls({ images: additionalImages });
    const allReviewImageUrls = this.getImageUrls({ images: reviewImageData });
    const allBeforeAfterImageUrls = this.getBeforeAfterImageUrls({
      beforeAfterImageData,
    });

    this.setState({
      productData,
      allReviewImageUrls,
      allProductImageUrls,
      allBeforeAfterImageUrls,
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
      const { reviewImageData, additionalImages, beforeAfterImageData } =
        productData;
      //NB - must update the new image URLs here otherwise they don't update when user navigates to a different product page
      const allProductImageUrls = this.getImageUrls({
        images: additionalImages,
      });
      const allReviewImageUrls = this.getImageUrls({ images: reviewImageData });
      const allBeforeAfterImageUrls = this.getBeforeAfterImageUrls({
        beforeAfterImageData,
      });

      this.setState({
        productData,
        allProductImageUrls,
        allReviewImageUrls,
        allBeforeAfterImageUrls,
        lightboxImages: [],
      });
    }
  }

  handleImageClickFn = ({ images, indexToDisplay }) => {
    this.setState({
      showLightboxModal: true,
      lightboxImages: images,
      lightboxImagesIndexToDisplay: indexToDisplay,
    });
  };

  handleLightboxCloseButtonFn = () => {
    this.setState({ showLightboxModal: false });
  };

  renderProduct = ({ productData }) => {
    const { allReviewImageUrls, allProductImageUrls, allBeforeAfterImageUrls } =
      this.state;
    return (
      <div>
        <div class="px-4">
          {
            <div>
              <div class="flex-col items-center justify-items-center sm:px-2">
                <div class="flex flex-col items-center lg:items-start lg:flex lg:flex-row mb-2 sm:mb-6 justify-center">
                  <div class="w-300px h-300px md:w-450px md:h-450px sm:mr-10">
                    <Carousel
                      images={allProductImageUrls}
                      slidesToShow={1}
                      imageWidth={
                        "w-min-300px h-min-300px md:w-min-450px md:h-min-450px"
                      }
                      handleImageClickFn={this.handleImageClickFn}
                      showCursorOnHover={true}
                    />
                  </div>
                  <div class="flex pt-4 lg:pt-0 lg:w-1/3 md:px-10 lg:px-0 lg:ml-14 pb-4">
                    <ProductInfo productDetails={productData} />
                  </div>
                </div>
                <div class="border-t flex flex-col md:flex md:flex-row md:justify-center md:items-center">
                  <div class="w-max-1600px">
                    <ReviewSummaryPanel productDetails={productData} />
                  </div>
                </div>
                {!isEmpty(allBeforeAfterImageUrls) && (
                  <div class="mt-8 pb-8 w-90vw mx-auto">
                    <BeforeAfterImages
                      beforeAfterImageUrls={allBeforeAfterImageUrls}
                    />
                  </div>
                )}
                {!isEmpty(allReviewImageUrls) && (
                  <div class="pb-8">
                    <div
                      class={`${productPageTitleStyle} w-90vw mx-auto border-t-2 py-4 mb-2`}
                    >
                      Product Photos
                    </div>
                    <div class="w-80vw mx-auto">
                      <Carousel
                        images={allReviewImageUrls}
                        handleImageClickFn={this.handleImageClickFn}
                        showCursorOnHover={true}
                      />
                    </div>
                  </div>
                )}
                <div class="sm:mt-2 mx-auto w-90vw border-t-2 text-gray-700">
                  <ReviewsListProvider>
                    <ReviewsList />
                  </ReviewsListProvider>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  };

  render() {
    const {
      productData,
      showLightboxModal,
      lightboxImages,
      lightboxImagesIndexToDisplay,
    } = this.state;
    const { backgroundOpacity } = this.props;
    if (isEmpty(productData)) return null;

    return (
      <div>
        <Navbar />
        <div class="h-60px"></div>
        <div class={`py-8 ${backgroundOpacity}`}>
          {this.renderProduct({ productData })}
          {
            <MediaLightbox
              showLightboxModal={showLightboxModal}
              images={lightboxImages}
              indexToDisplay={lightboxImagesIndexToDisplay}
              handleLightboxCloseButtonFn={this.handleLightboxCloseButtonFn}
            />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(ProductPage);
