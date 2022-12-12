import { PureComponent } from "react";
import { REGION, S3_BUCKET } from "../../aws-config";
import "./circle.css";
class ProductCard extends PureComponent {
  state = {
    displayChevron: true,
  };

  handleProductCardClick = async ({ productId }) => {
    const { history } = this.props;
    history.push(`/product?productId=${productId}`);
  };

  handleMouseEnter = (e) => {
    this.setState({ displayChevron: false });
  };
  handleMouseLeave = (e) => {
    this.setState({ displayChevron: true });
  };

  render() {
    const { data } = this.props;
    const { dbg_price, productDetails } = data;
    const { productName, mainImageUrl, productId, brandName } = productDetails;
    const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${mainImageUrl}`;
    const localCurrency = localStorage.getItem("localCurrency") || "£";
    return (
      <div class="mb-4">
        <figure
          class="mx-auto bg-darkStone cursor-pointer transition-transform transform sm:hover:shadow-md sm:hover:opacity-50 sm:hover:opacity-100"
          onClick={() => this.handleProductCardClick({ productId: productId })}
        >
          <div>
            <div class="relative pt-full">
              <div class="absolute inset-0 pt-4 h-full w-full my-auto mx-auto">
                <img
                  src={s3ImageUrl}
                  alt="product"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div class="h-1" />
          <figcaption class="py-4 sm:py-6 sm:px-4 flex flex-col content-between">
            <div class="text-center tracking-tighter text-xs sm:text-sm lg:text-base text-slate-gray mb-2">
              {brandName}
            </div>
            <div class="text-center mb-4">
              <div class="text-xs sm:text-base text-slate-gray font-medium tracking-widest font-normal uppercase">
                {productName}
              </div>
            </div>
            <div class="text-center text-xs sm:text-base text-slate-gray w-full font-light">
              {`${localCurrency} ${(Math.round(dbg_price * 100) / 100).toFixed(
                2
              )}`}
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default ProductCard;
