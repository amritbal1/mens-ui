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
    const productData = await getProductData({ productId });
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

  renderProduct = ({ productData }) => {
    const { allProductImageUrls } = this.state;
    const {
      overallMetrics: {
        attributeAnalysis,
        skinTypeAnalysis,
        skinConcernAnalysis,
      },
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
              <ProductInfo productDetails={productData} attributeAnalysis={attributeAnalysis} />
            </div>
          </div>

          <div class="pt-4 w-full px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
            {!isEmpty(skinTypeAnalysis) && (
              <SkinInfo
                analysisData={skinTypeAnalysis}
                infoValue={"skinType"}
              />
            )}
            {!isEmpty(skinConcernAnalysis) && (
              <SkinInfo
                analysisData={skinConcernAnalysis}
                infoValue={"skinConcern"}
              />
            )}
            {!isEmpty(attributeAnalysis) &&
              attributeAnalysis.map((analysisData) => {
                return <AttributeInfo analysisData={analysisData} />;
              })}
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
